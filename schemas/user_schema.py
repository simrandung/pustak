from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    cart: Optional[List[str]] = []
    wishlist: Optional[List[str]] = []