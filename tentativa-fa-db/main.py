from fastapi import FastAPI
from routes.user_route import router
from routes.product_route import client
from routes.sale_route import rota
from routes.front_route import front_router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

@app.get("/health-check")
def health_check():
    return "works"

app.include_router(router=router)
app.include_router(router=client)
app.include_router(router=rota)
app.include_router(router=front_router)









