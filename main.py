from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.books import router as books_router
from routes.cart import cart_router
from routes.auth import router as user_router
from routes.wishlist import router as wishlist_router


app = FastAPI()

app.include_router(books_router,prefix="/api",tags=["Books"])
app.include_router(cart_router,prefix="/api",tags=["Cart"])
app.include_router(user_router,prefix="/api", tags=["User"])
app.include_router(wishlist_router, prefix="/api",tags=["Wishlist"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
