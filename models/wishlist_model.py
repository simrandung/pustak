from pydantic import BaseModel
from typing import Optional

class WishlistCreate(BaseModel):
    book_id: str

class WishlistResponse(BaseModel):
    id: str
    user_id: str
    book_id: str
    notified_unavailable: Optional[bool] = False
    notified_available: Optional[bool] = True