from fastapi import APIRouter,Form,Depends,status
from fastapi.responses import RedirectResponse


from sqlalchemy.orm import Session
from typing import List
from routes.deps import get_conection
from use_cases.user_use_case import User_use_cases
from use_cases.product_use_case import Product_Use_Case
from use_cases.sale_use_case import Sale_Use_Case
from passlib.context import CryptContext
from schema.user_schema import User_schema,User_Schema_Front
from schema.product_schema import Product_Schema,Product_Schema_Front
from schema.sale_schema import Sale_Schema,Sale_Schema_Front,Sale_Schema_Put
from db.model import User,Product,Sales

front_router = APIRouter(prefix="/front",tags=["Front"])

crypt =CryptContext(schemes=["sha256_crypt"])



#User

@front_router.post("/",tags=["User-Front"])
def post_front(db_session:Session = Depends(get_conection),nome:str=Form(...),cpf:str=Form(...),senha:str=Form(...),email:str=Form(...)):
    person = User_schema(name=nome,email=email,password=senha,cpf_cnpj=cpf,is_active=True)
    print("1")
    uc = User_use_cases(db_session=db_session)
    uc.post_user(person)
    

@front_router.get("/users-page", response_model=List[User_Schema_Front],tags=["User-Front"])
def get_users(db_session: Session = Depends(get_conection)):
    users = db_session.query(User).all()
    
    return users 

@front_router.post("/put-user",tags=["User-Front"])
def put_user(db_session:Session = Depends(get_conection),name:str=Form(...),id:int=Form(...),password:str=Form(...),email:str=Form(...)):
    person = db_session.query(User).where(User.id == id).first()
    
    person.email = email
    person.name = name
    person.password = password
    db_session.add(person)
    try:
        db_session.commit()
        return RedirectResponse(url="/front/users-page", status_code=303)

    except:
        return "Erro!"





#Prod

@front_router.post("/product",tags=["Product-Front"])
def post_product(db_session:Session = Depends(get_conection),name:str=Form(...),quantity:int=Form(...),price:int=Form(...),user_id:int=Form(...)):
    uc = Product_Use_Case(db_session=db_session)
    produto = Product_Schema(name=name,quantity=quantity,price=price,user_id=user_id)
    uc.post(product=produto)


@front_router.get("/product-page",response_model=List[Product_Schema_Front],tags=["Product-Front"])
def get_product(db_session: Session = Depends(get_conection)):
    products = db_session.query(Product).all()
    return products

@front_router.post("/put-product",tags=["Product-Front"])
def put_product(db_session:Session = Depends(get_conection),name:str=Form(...),quantity:int=Form(...),price:int=Form(...),id:int=Form(...)):
    product = db_session.query(Product).where(Product.id == id).first()

    product.name = name
    product.price= price
    product.quantity= quantity

    db_session.add(product)
    db_session.commit()

    return RedirectResponse(url="/front/product-page")

@front_router.delete("/del-prod/{id}")
def del_prod(id:int,db_session:Session = Depends(get_conection)):
    uc = Product_Use_Case(db_session=db_session)
    uc.del_prod(id=id)


    

#Venda

@front_router.post("/venda",tags=["Sale-Front"])
def post_venda(db_session:Session = Depends(get_conection),user_id:int=Form(...),product_id:int=Form(...),quantity:int=Form(...)):
    uc = Sale_Use_Case(db_session=db_session)
    venda = Sale_Schema(user_id=user_id,product_id=product_id,quantity=quantity)
    uc.comprar(venda)

@front_router.get("/venda-page",tags=["Sale-Front"],response_model=List[Sale_Schema_Front])
def get_all_venda(db_session:Session=Depends(get_conection)):
    uc = Sale_Use_Case(db_session=db_session)
    return uc.get_all()

@front_router.post("/put-venda",tags=["Sale-Front"])
def put_venda(id:int=Form(...),Quantity:int=Form(...),db_session:Session= Depends(get_conection)):
    uc= Sale_Use_Case(db_session=db_session)
    venda = uc.get_by_id(id=id)
    venda_scheme=Sale_Schema_Put(id=id,user_id=venda.user_id,product_id=venda.product_id,quantity=Quantity)
    uc.put_venda(venda_scheme)

@front_router.delete("/del-venda/{id}",tags=["Sale-Front"])
def del_venda(id:int,db_session:Session=Depends(get_conection)):
    uc = Sale_Use_Case(db_session=db_session)
    uc.del_venda(id)
    return status.HTTP_200_OK





    






    


    

