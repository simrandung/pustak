from fastapi import APIRouter, HTTPException, status, Depends,Query
from schemas.user_schema import UserRegister
from core.database import users_collection
from fastapi.security import OAuth2PasswordRequestForm
from models import user_model
from models.user_model import hash_password
from authentication.auth import create_token

router = APIRouter()

@router.post("/register")
def register(user: UserRegister):
    existing = user_model.find_user_by_email(users_collection, user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = user.dict()
    user_id = user_model.create_user(users_collection, user_data)
    return {"message": "User Registered Successfully", "user_id": user_id}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = user_model.find_user_by_email(users_collection, form_data.username)

    if not user or not user_model.verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}
@router.get("/check-email")
def check_email_exists(email:str = Query(...)):
    user = users_collection.find_one({"email":email})
    return{"exists": bool(user)}
