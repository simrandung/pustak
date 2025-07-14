from passlib.context import CryptContext
from bson.objectid import ObjectId

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_user(users_collection, user):
    user["password"] = hash_password(user["password"])
    user["cart"] = []
    result = users_collection.insert_one(user)
    return str(result.inserted_id)

def find_user_by_email(users_collection, email: str):
    return users_collection.find_one({"email": email})

