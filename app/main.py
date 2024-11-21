from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import items
from app.database import Base, engine

# Initialize database
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# Add CORS middleware to allow cross-origin requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows only your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(items.router)
