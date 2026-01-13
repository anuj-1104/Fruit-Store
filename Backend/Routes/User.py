from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from models.User import UserCreate, UserResponse,LoginResponse, User  ,ForgetPassword
from utils.passw_helper import hash_password,verify_password
from utils.jwt_helper import create_access_token,get_current_user
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from database.Connection import db,users
from dotenv import load_dotenv
from datetime import datetime
from fastapi import Depends,status
from typing import Annotated,Any        #pass a argument of the datatype and description of type Annotated 
from fastapi.responses import JSONResponse          
from bson import ObjectId
from models.User import UserCreate, LoginUser, LoginResponse, User

load_dotenv()       #used to find a env variable

user_router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



# User Registration - 
@user_router.post("/user", status_code=200, response_model=UserResponse)
async def register_user(user: UserCreate):
    """
    Registers a user, hashes password, inserts to DB and returns user info.
    """

    exist_user = db.users.find_one({"email": user.email})
    if exist_user:
        raise HTTPException(status_code=401, detail="User already exists")

    user_doc = user.model_dump()
    user_doc["password"] = hash_password(user_doc["password"])  #add a password a change hashpassword str
    user_doc["createdAt"] = datetime.now()

    # Insert user
    db.users.insert_one(user_doc)

    return UserResponse(
        token_type="bearer",
        user=User(  # Use User pydentic
            email=user.email,
            name=user.name,
            phone=user.phone
        )
    )

#--------ForgetPassword -------

@user_router.post("/forget_pass",status_code=200)
async def forget_password(data:ForgetPassword)->Any:
    """
    Docstring for forget_password
    :param data: Description
    :type data: ForgetPassword
    :param current_user: Description
    """
    try:
        db_user = db.users.find_one({"email":data.email})

        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
        

        if not verify_password(data.password, db_user.get("password")):    #check a password a match or not 
            raise HTTPException(status_code=401, detail="Invalid email or password")

        hashed_password=hash_password(data.confirm_pass)
        
        #only update a password and updatedDate used a $set
        update_data=db.users.update_one(
            {"email":data.email},
            {"$set": {"password": hashed_password, "updatedAt": datetime.now()}}
        )

        if update_data.matched_count ==0:
            raise HTTPException(status_code=404,detail="data not updated")

        return JSONResponse(
            content="Password Updated Successfully"
        )
        
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Server Error..{str(e)}")



# User Login - 
@user_router.post("/login", response_model=LoginResponse ,status_code=200)
async def login(form_data:LoginUser)->dict:              #to handle a request for the depends on a OAuthrequest formdata accepts  // Annotated[OAuth2PasswordRequestForm,Depends()]
    """
    Docstring for login
    
    :param form_data: Description
    :type form_data: LoginUser
    """
    try:
        user = db.users.find_one({"email":form_data.email})       
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify password
        if not verify_password(form_data.password, user.get("password")):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password")
        
        # Create JWT token
        token = create_access_token(data={"sub": str(user["_id"])})
        # print(token)
        
        return LoginResponse(
            access_token=token,
            token_type="bearer",
            user=User(
                email=user["email"],
                name=user.get("name"),
                phone=user.get("phone")
            )
        )

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Login failed {str(e)}")
    
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_305_USE_PROXY,detail="User Not Found")
    

#------- UserProfile ----------

@user_router.get("/profile", response_model=User,status_code=200)
async def get_profile(current_user_id: str = Depends(get_current_user))->str:
   """
   Docstring for get_profile
   
   :param current_user_id: Description
   :type current_user_id: str
   :return: Description
   :rtype: str
   """
   try:

    id=current_user_id.get("id")
    db_user = db.users.find_one({"_id":ObjectId(id)},{"password":0})        #exclude password
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    clean_user = {
        "email": db_user["email"],
        "name": db_user.get("name"),
        "phone": db_user.get("phone")
    }
    return User(**clean_user)           #actutal data used a ** pydentic
   
   except Exception as e:
    raise HTTPException(status_code=404, detail=f"User not found {str(e)}") 

    