from fastapi import APIRouter,Form,Depends,Response,status,HTTPException
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from sqlalchemy.orm import Session
from typing import List
from routes.deps import get_conection
from use_cases.user_use_case import User_use_cases
from use_cases.product_use_case import Product_Use_Case
from passlib.context import CryptContext
from schema.user_schema import User_schema,User_Schema_Front
from schema.product_schema import Product_Schema,Product_Schema_Front
from db.model import User,Product

front_router = APIRouter(prefix="/front",tags=["Front"])

crypt =CryptContext(schemes=["sha256_crypt"])





@front_router.post("/")
def post_front(db_session:Session = Depends(get_conection),nome:str=Form(...),cpf:str=Form(...),senha:str=Form(...),email:str=Form(...)):
    person = User_schema(name=nome,email=email,password=senha,cpf_cnpj=cpf,is_active=True)
    print("1")
    uc = User_use_cases(db_session=db_session)
    uc.post_user(person)
    

@front_router.get("/users-page", response_model=List[User_Schema_Front])
def get_users(db_session: Session = Depends(get_conection)):
    users = db_session.query(User).all()
    
    return users 

@front_router.post("/put-user")
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

@front_router.post("/product",tags=["Product-Front"])
def post_product(db_session:Session = Depends(get_conection),name:str=Form(...),quantity:int=Form(...),price:int=Form(...)):
    uc = Product_Use_Case(db_session=db_session)
    produto = Product_Schema(name=name,quantity=quantity,price=price,user_id=1)
    uc.post(product=produto)


@front_router.get("/product-page",response_model=List[Product_Schema_Front],tags=["Product-Front"])
def get_product(db_session: Session = Depends(get_conection)):
    lista_products = db_session.query(Product).all()
    return lista_products



    


"""@front_router.get("/users-page")
def get_page(request:Request):
    return templates.TemplateResponse("users.html",{"request":request})"""

"""@front_router.get("/")
def read_front(request:Request)a:
    return templates.TemplateResponse(request=request,name="index.html")"""

"""@front_router.get("/sucesso")
def success_page(request: Request):
    return templates.TemplateResponse("sucesso.html", {"request": request})"""
    

