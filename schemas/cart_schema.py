def cartEntity (cart) -> dict:
    return {
         "user_id": cart["user_id"],
        "book_id": cart["book_id"],
        "title": cart["title"],
        "quantity": cart["quantity"]
        
    }

def cartEntityList(cart_list) -> list:
    return [cartEntity(cart) for cart in cart_list]