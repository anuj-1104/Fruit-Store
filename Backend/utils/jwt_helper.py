from database.Connection import db, users, products, purchases
from datetime import timedelta, datetime, timezone
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends 
from dotenv import load_dotenv
from jose import jwt, JWTError
from bson import ObjectId
import os                  

load_dotenv()

#access a login user details
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/login") 

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


# Validate environment variables
if not SECRET_KEY:
    raise ValueError("SECRET_KEY not found in environment variables")
if not ALGORITHM:
    raise ValueError("ALGORITHM not found in environment variables")


#create a token
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:     #return a string

    """" Create a Token """
    # print(data)
    try:
        to_encode = data.copy()     #copy a data to encode
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

        return encoded_jwt
    
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Server Error {str(e)}")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:        #return a dictinory
    """"Get a User in Access Token"""
    try:    
        
        #find the user id from the token decode to find a user id
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")   
        
        
        if user_id is None:
            raise HTTPException(status_code=404, detail="Invalid token: missing user ID")
        
        user_doc = db.users.find_one({"_id": ObjectId(user_id)})        #used a mongo is a Objectid to find a id
        if not user_doc:
            raise HTTPException(status_code=404, detail="User not found")

        return{
            "id":user_id,
            "role":user_doc.get("role","user"),     #pass a role of the user
        } 
       
    except JWTError as e:
        raise HTTPException(status_code=403, detail=f"Invalid token: {str(e)}")
    except ValueError as e:
        raise ValueError()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Authentication error {str(e)}")   
    