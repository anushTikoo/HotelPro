from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import lifespan
from routers import auth, rooms, bookings, staff, dashboard

app = FastAPI(title="Hotel Management API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(rooms.router, prefix="/rooms", tags=["Rooms"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
app.include_router(staff.router, prefix="/staff", tags=["Staff"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

@app.get("/")
def root():
    return {"message": "Hotel Management API", "status": "running"}