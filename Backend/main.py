import os
from dotenv import load_dotenv
from fastapi import FastAPI,status
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

#-------routes-----------
from Routes.User import user_router
from Routes.Product import product_router

app=FastAPI()

# print(origin) ---------#check link
origin=os.getenv("ORIGIN_CLIENT")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origin, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Default server Routes
@app.get("/")
async def default():
   return {'status':status.HTTP_200_OK,"Message":"Server is Running.."}

#Mount a static file in browser Image
# from fastapi.staticfiles import StaticFiles                           //used for the locally store a file  mount
# app.mount("/static", StaticFiles(directory="static"), name="static")  

#Routes a Api
app.include_router(prefix="/api/user",router=user_router,tags=["users"])
app.include_router(prefix="/api/product",router=product_router,tags=["product"])
