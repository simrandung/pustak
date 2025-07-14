from pydantic import BaseModel, Field

class Book(BaseModel):
    #id: int
    id: str = Field(..., description="The unique identifier of the book")
    title: str
    author: str
    price: float
    cover_image: str = None
    in_stock : bool = Field(default=True)