import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# MongoDB connection
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in environment variables")

client = MongoClient(DATABASE_URL)

# Database configuration
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
DEBUG = os.getenv("DEBUG", "False") == "True"

# Database and collections
db = client["Ecommerce"]

# Collection references
users = db["users"]
products = db["product"]
purchases = db["purchases"] 