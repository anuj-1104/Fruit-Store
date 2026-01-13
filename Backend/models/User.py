from pydantic import BaseModel, EmailStr,Field      #field validator
from typing import Optional

class User(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str=Field(description="Enter a password",examples=["12345678"])
    name: Optional[str] = None
    phone: Optional[str] = None
    role:str=Field(examples=["admin"],default="user")

class UserResponse(BaseModel):
    token_type: str
    user: User

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: User

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class ForgetPassword(BaseModel):
    email:EmailStr
    password:str
    confirm_pass :str
    createdAt:Optional[str]=None
