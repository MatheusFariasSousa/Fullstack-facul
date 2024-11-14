from pydantic import BaseModel

class Sale_Schema(BaseModel):
    user_id:int
    product_id:int
    quantity:int

class Sale_Schema_Front(BaseModel):
    id:int
    User:str
    Product:str
    Quantity:int
    Price:int

class Sale_Schema_Put(BaseModel):
    id:int
    user_id:int
    product_id:int
    quantity:int
    