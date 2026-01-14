from models.Product import Product, ResponseProduct, OrderCreateSchema,Ordernew
from fastapi import APIRouter, HTTPException, Depends,File,UploadFile ,Form              #used for the other depend a value
from utils.jwt_helper import get_current_user
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi import status
from database.Connection import db,users,products,purchases
from datetime import datetime
from bson import ObjectId       #to convert a string in the object id to used a mongodb
import os
import requests
from dotenv import load_dotenv
from pathlib import Path       #used for the file path
from typing import Any,List

load_dotenv()
IMAGE_URL=os.getenv("IMAGE_URL")


product_router = APIRouter()

image_bb_key=os.getenv("IMAGE_BB_KEY")

#----------------- Get all products ----------------
@product_router.get("/products", status_code=200)
async def get_all_products():
    products_list = db.products.find().to_list(1000)

    return [
        ResponseProduct(
            p_id=str(doc["_id"]),       #Pass a product id 
            p_name=doc["p_name"],
            p_qty=doc["p_qty"],
            p_price=doc["p_price"],
            p_offerprice=doc["p_offerprice"],
            image_url=doc.get("p_image"),
            description=doc.get("description")
        )
        for doc in products_list
    ]


#------------- Add a product -----------------

UPLOAD_DIR =os.getenv("IMAGE_URL")        #USED A ImageBB
# UPLOAD_DIR.mkdir(exist_ok=True)     #create a new not a exist

@product_router.post("/add", status_code=201, dependencies=[Depends(get_current_user)])
async def create_product(
    p_id:int=Form(...),
    p_name: str=Form(...) ,           
    p_qty: int=Form(...),            
    p_price: float=Form(...) ,        
    p_offerprice: float=Form(...),  
    image: UploadFile = File(...),
    description: str = Form(...),
    current_user_id: str = Depends(get_current_user)):           #to Form type upload file

    try:
        # Admin check
        if current_user_id.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        
        # Duplicate check - use p_name field
        existing = db.products.find_one({"p_name":p_name})
        if existing:
            raise HTTPException(status_code=409, detail="Product already exists")
    
        #---------------Upload a file ------------------
        # file_extension = image.filename.split(".")[-1]          #spilt a name reverse name 
        # filename = f"{uuid.uuid4()}.{file_extension}"
        # image_path = UPLOAD_DIR / filename    

        data = {"key": image_bb_key}
        files = {"image": image.file}
        res = requests.post(IMAGE_URL, data=data, files=files).json()
        img_url = res["data"]["url"]
    
        # with image_path.open("wb") as buffer:
        #     content = await image.read()
        #     buffer.write(content)

        # image_url = f"/static/uploads/{filename}"
        created_date=datetime.utcnow()

        product_dict={
            "p_id":p_id,
            "p_name":p_name,
            "p_qty":p_qty,
            "p_price":p_price,
            "p_offerprice":p_offerprice,
            "p_image":img_url,
            "created_at":created_date,
            "description":description
        }
        
        result = db.products.insert_one(product_dict)
        
        product_dict["_id"] = str(result.inserted_id)# Add MongoDB ID to response
        return {
            "message": "Product added successfully",
            "product": {
                **product_dict,             ##Original Datajson clean the data
                "_id": str(result.inserted_id)  #  Add ID to response
            },
            "id": str(result.inserted_id)
        }
    except HTTPException as e:
        print(f"Error:{e}")
        raise HTTPException(status_code=401,detail=f"Data not Add {e}")
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add product")



# ------------Update product only used a  admin --------------
@product_router.put("/update/{productid}", status_code=200, dependencies=[Depends(get_current_user)])   
async def update_product(
    productid: str, 
    data: Product,
    current_user: Any = Depends(get_current_user)):     #All types are allowed not a specific fixed
    try:
        # Admin check
        if current_user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        
        result = db.products.update_one(
            {"_id":ObjectId (productid)},
            {"$set": data.model_dump()}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"status": "ok", "message": "Product updated successfully"}

    except HTTPException:
        raise 
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

# ----------------------Delete product---------------------
@product_router.delete("/delete/{id}", status_code=200, dependencies=[Depends(get_current_user)])
async def delete_product(
    id: str,
    current_user: dict = Depends(get_current_user)):        #get the current login userid
    try:
        # Admin check
        if current_user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        
        product_id = db.products.find_one({"_id": ObjectId(id)})

        if not product_id:
            raise HTTPException(status_code=404, detail="Product not found")

        db.products.delete_one({"_id": ObjectId(id)})       #to delete a particular mogo id
        return {"success": "Product Deleted Successfully"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error:{e}")

class ProductRequest(BaseModel):
    p_id:List[str]

@product_router.post("/findproduct/{p_id}", status_code=200,response_model=ResponseProduct)
async def find_product(p_id:str):

    try:
       
        # pro_id=request.p_id[0]      #used a list to one at a time find a product
        # print(f"new id :{pro_id}")
        product_id = db.products.find_one({"_id":ObjectId(p_id)})

        if not product_id:
            raise HTTPException(status_code=404, detail="Product not Found")
        
        return ResponseProduct(
            p_id=str(product_id["_id"]),       #Pass a product id 
            p_name=product_id["p_name"],
            p_qty=product_id["p_qty"],
            p_price=product_id["p_price"],
            p_offerprice=product_id["p_offerprice"],
            image_url=product_id.get("p_image"),
            description=product_id.get("description")
        )
    
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"server Error {str(e)}")
    



@product_router.post("/feedback",status_code=200)
async def feedback_form(current_user:dict=Depends(get_current_user)):
    """Submit a user feedback"""
    try:
        id=current_user.get("id")
        user_find= db.users.find_one({"_id":ObjectId(id)},{"password":0})

        if not user_find:
            raise HTTPException(status_code=404,detail="User not found")

        #store a message for the order user
        return JSONResponse(
            status_code=200,
             content={"message":"Thank You Submit Your Feedback"},
        )
           
    except HTTPException as e:
        raise HTTPException(status_code=500,detail=f"Internal server error {str(e)}")



@product_router.post("/order/product", status_code=200)
async def orderProduct(data: Ordernew, current_user: dict = Depends(get_current_user)):
    """Order new Order"""   
    
    try:
        user_id = current_user.get("id")
        user_data = db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
        
        if not user_data:
            raise HTTPException(status_code=404, detail="User not found")
        

        #addd the particular login user id and datetime
        data_dict = data.model_dump()
        data_dict["user_id"] = str(user_data["_id"])
        data_dict["created_At"] = datetime.utcnow().isoformat() + "Z"
        
        product_object_ids = []
        for item in data.p_items:
            try:
                product_object_ids.append(ObjectId(item.p_id))
            except:
                raise HTTPException(400, f"Invalid product ID: {item.p_id}")
        
        product_data = list(
            db.products.find(
                {"_id": {"$in": product_object_ids}},
                {"p_id": 1, "p_name": 1, "p_qty": 1, "p_offerprice": 1}
            )
        )
        
        product_lookup = {str(p["_id"]): p for p in product_data}

        unavailable_data = []
        for item in data.p_items:
            product_id = item.p_id 
            
            if product_id not in product_lookup:
                unavailable_data.append({
                    "p_id": product_id,
                    "error": "PRODUCT_NOT_FOUND"
                })
                continue
            
            product = product_lookup[product_id] 
            
            # Stock check
            if product.get("p_qty", 0) < item.p_qty:
                unavailable_data.append({
                    "p_id": product_id,
                    "p_name": product.get("p_name", "Unknown"),
                    "available_stock": product["p_qty"],
                    "required": item.p_qty,
                    "error": "INSUFFICIENT_STOCK"
                })
        
        if unavailable_data:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "PRODUCT_UNAVAILABLE",
                    "unavailable": unavailable_data
                }
            )
        
        order_data = db.purchases.insert_one(data_dict)
        return {
            "status": "success", 
            "message": "Order created successfully", 
            "order_id": str(order_data.inserted_id)
        }
        
    except HTTPException:
        raise HTTPException(detail="error")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


#-----all user orders-----------
@product_router.get("/all/orders",status_code=200)
async def getallorder(currnt_user:Any=Depends(get_current_user)):      #secure routes
    """Get all  orders"""

    try:
        user_id=currnt_user.get("id")

        if not user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="not found")
        
        #new Orderfirst
        all_orders= list(db.purchases.find({"user_id":str(user_id)}))     #exclude a order id 
        # print(all_orders)

        #to seprate a all order id convert in string object id not a passed
        for order in all_orders:
            order["_id"] = str(order["_id"])    
        
        if not all_orders:
            return{
                "message":"Order Not Found..",
                "orders":[],
                "count":0
            }

        return({
            "status":"ok",
            "message":"sucessfully find data",
            "orders":all_orders,
            "count":len(all_orders)
        })
       
    except ValueError as e:
        raise HTTPException(status_code=500,detail=f"Internal server Error. {str(e)}")
    

#