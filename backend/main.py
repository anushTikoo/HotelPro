from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import lifespan
from routers import auth, rooms, bookings, staff, dashboard
import uvicorn
import os

app = FastAPI(title="Hotel Management API", lifespan=lifespan)

origins = [ os.getenv("FRONTEND_URL") ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.hotelpro\.pages\.dev",
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)