from fastapi import APIRouter, HTTPException, Depends
from models.book_model import Book
from core.database import sample_collection, users_collection
from schemas.book_schema import bookEntity, booksEntity
from bson import ObjectId
from authentication.auth import get_current_user
from utils.email import send_email

router = APIRouter()

@router.get("/books")
async def get_books():
    return booksEntity(sample_collection.find({}))

@router.get("/books/{id}")
async def get_book_by_id(id: str):
    book = sample_collection.find_one({"_id": ObjectId(id)})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return bookEntity(book)

@router.get("/books/search")
async def get_book_by_title(title: str):
    books = sample_collection.find({"title": {"$regex": title, "$options": "i"}})
    result = []
    for book in books:
        book["_id"] = str(book["_id"])
        result.append(book)
    return result

@router.post("/books")
async def create_book(book: Book, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can add books")

    sample_collection.insert_one(dict(book))
    return bookEntity(sample_collection.find_one({"title": book.title}))

@router.put("/books/{id}")
async def update_book(id: str, book: Book, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can update books")

    sample_collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(book)})
    return {"msg": "Book updated successfully"}

@router.delete("/books/{id}")
async def delete_book(id: str, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can delete books")

    sample_collection.find_one_and_delete({"_id": ObjectId(id)})
    return {"msg": "Book deleted successfully"}
# Dummy email sender
# def send_email_available(email: str, book_title: str):
#     print(f"[EMAIL] To: {email} | '{book_title}' is now back in stock!")

@router.post("/{book_id}/restock")
def restock_book(book_id: str, current_user=Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can restock books")

    updated = sample_collection.update_one(
        {"_id": ObjectId(book_id)},
        {"$set": {"in_stock": True}}
    )
    if updated.modified_count == 0:
        raise HTTPException(status_code=404, detail="Book not found or already in stock")

    users = users_collection.find({
        "wishlist": {
            "$elemMatch": {
                "book_id": book_id,
                "notified_available": False
            }
        }
    })

    for user in users:
        email = user["email"]
        name = user.get("name", "User")
        wishlist = user.get("wishlist", [])
        updated_wishlist = []

        for item in wishlist:
            if item["book_id"] == book_id and not item.get("notified_available", False):
                send_email(
                    subject=f"'{item['title']}' is now back in stock!",
                    body=f"Hi {name},\n\nThe book '{item['title']}' is now available again. Visit the app to buy it.",
                    to_email=email
                )
                item["notified_available"] = True
            updated_wishlist.append(item)

        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"wishlist": updated_wishlist}}
        )

    return {"msg": "Book restocked and users notified via email"}