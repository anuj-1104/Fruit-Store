from passlib.context import CryptContext        #to used a multiple algorithem hash & verify method

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    pw = (password or "")[:72]      #password length must be a 72 split return a string
    return pwd_context.hash(pw)

def get_password_hash(password: str) -> str:
    return hash_password(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:     #return a true and false
    pw = (plain_password or "")[:72]
    return pwd_context.verify(pw,hashed_password)


# haswd_passwo="$2b$12$BxN2gb3ODhR7iNOW/iBR3.wOMf.4GNasZC8boCAQ7P6Rif8y7BZly"
# original_password="11111111"

# password=verify_password(plain_password=original_password,hashed_password=haswd_passwo)
# print(password)