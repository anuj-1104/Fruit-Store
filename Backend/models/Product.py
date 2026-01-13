from fastapi import FastAPI
from pydantic import BaseModel, Field, ConfigDict, model_validator,field_validator
from datetime import datetime
from bson import ObjectId
from typing import Optional, List

app = FastAPI()

# ---------------- Product Model ----------------
class Product(BaseModel):
    p_id: int
    p_name: str
    p_qty: int
    p_price: float
    p_offerprice: float
    p_description:str
    image_url:str
    description:str
    createdAt: datetime = Field(default_factory=datetime.utcnow)


    #configur the date formate
    model_config = ConfigDict(
        json_encoders={datetime: lambda v: v.strftime("%d-%m-%Y %H:%M:%S")}     #formate the timeset
    )


# ---------------- Helper to validate ObjectId ----------------
def validate_objectid(value: str) -> str:       #return a string
    if ObjectId.is_valid(value):
        return value
    raise ValueError(f"Invalid ObjectId: {value}")


class OrderCreateSchema(BaseModel):
    p_id: List[str]
    quantity: int
    total_price: float
    order:str=Field(default="pending")
    

    @field_validator("p_id")        #field validate for the used a class any variavle
    @classmethod            #used a class variable 
    def validate_p_id(cls, value):
        if not isinstance(value, list):
            raise ValueError("p_id must be a list")

        for pid in value:
            validate_objectid(pid)  # raises error if invalid check the correct id or not
        return value
    
class OrderInDB(OrderCreateSchema):
    user_id: str

# ---------------- Simple Order Model ----------------
class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    user_id: str
    total_price: float

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True
    )

# ---------------- Response Model ----------------
class ResponseProduct(BaseModel):
    p_id: str
    p_name: str
    p_qty: int
    p_price: float
    p_offerprice: float
    image_url: Optional[str] = None
    description:str

#---------
class Ordernew(BaseModel):

    user_id:Optional[str]=None
    p_items:List[ResponseProduct]
    total_price:int
    created_At: datetime = Field(default_factory=datetime.now)
