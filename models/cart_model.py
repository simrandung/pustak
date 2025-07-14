from pydantic import BaseModel
from typing import Optional

class cartItem(BaseModel):
    user_id: str
    book_id: str
    title: str
    quantity: int = 1