from sqlalchemy.orm import Session
from schema.sale_schema import Sale_Schema,Sale_Schema_Put
from fastapi import HTTPException,status
from db.model import Product,User,Sales

class Sale_Use_Case:
    def __init__(self,db_session:Session):
        self.db_session = db_session

    def comprar(self,sale:Sale_Schema):
        quant = self.db_session.query(Product).where(Product.id == sale.product_id).where(User.id == sale.user_id).first()
        if not quant:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid product or user id")
        if quant.quantity<sale.quantity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="there is not enough product avaible in stock")
        quant.quantity -= sale.quantity
        price = sale.quantity * quant.price
        self.db_session.add(quant)
        try:
            self.db_session.commit()
        except:
            HTTPException(detail="product put error")
        sell = Sales(sale.user_id,sale.product_id,sale.quantity,price)
        self.db_session.add(sell)
        try:
            self.db_session.commit()
        except:
            HTTPException(detail="sell post error")
    
    def get_by_id(self,id:int):
        sale = self.db_session.query(Sales).where(Sales.id==id).first()
        if not sale:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid id")
        return sale

    def get_all(self):
        sales = self.db_session.query(Sales.id,User.name,Product.name,Sales.quantity,Sales.price).join(User,Sales.user_id==User.id).join(Product,Product.id==Sales.product_id).all()
        for venda in sales:
            yield {"id":venda[0],"User":venda[1],"Product":venda[2],"Quantity":venda[3],"Price":venda[4]}

    def put_venda(self,sale:Sale_Schema_Put):
        venda = self.db_session.query(Product).where(Product.id == sale.product_id).first()
        if not venda:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid id")
        if venda.quantity<sale.quantity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Not enough product")
        venda.quantity -= sale.quantity

        self.db_session.add(venda)
        try:
            self.db_session.commit()
        except:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        
        new_sale = self.db_session.query(Sales).where(Sales.id == sale.id).first()
        new_sale.quantity = sale.quantity
        new_sale.price = sale.quantity * venda.price

        self.db_session.add(new_sale)
        try:
            self.db_session.commit()
        except:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        

    def del_venda(self,id:int):
        venda = self.get_by_id(id=id)

        self.db_session.delete(venda)
        try:
            self.db_session.commit()

        except:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)



        
            

        
        

    



        
 

