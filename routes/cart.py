from fastapi import APIRouter, HTTPException, Depends
from core.database import users_collection
from authentication.auth import get_current_user
from schemas.cart_schema import cartEntityList,cartEntity

cart_router = APIRouter()

@cart_router.post("/cart/add")
def add_to_cart(book: dict, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403, detail="Only users can add to cart")
    
    user_email = current_user["email"]
    book_title = book.get("title")

    if not book_title:
        raise HTTPException(status_code=400, detail="Book title is required")
    user = users_collection.find_one({"email":user_email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    cart = user.get("cart",[])
    updated = False

    for item in cart:
        if item["title"] == book_title:
            item["quantity"] +=1
            updated = True
            break
    if not updated:
        cart.append({
            "book_id": book.get("id"),
        "title": book.get("title"),
        "quantity": book.get("quantity", 1)

        })



    result = users_collection.update_one(
        {"email": current_user["email"]},
        {"$set": {"cart": cart}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to add to cart")

    return {"msg": f"Book added to {current_user['email']}'s cart"}

@cart_router.get("/cart")
def get_all_items_cart(current_user:dict = Depends(get_current_user)):
    if current_user.get("role") != "user":
        raise HTTPException(status_code=403,detail="Only users can access their cart")
    user = users_collection.find_one({"email": current_user["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return  {
        "email": user["email"],
        "cart": user.get("cart",[])
    }