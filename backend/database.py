import asyncpg
import os
import asyncio
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from fastapi import FastAPI

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
db_pool = None

MAX_RETRIES = 5
RETRY_DELAY = 5          # seconds between retries
CONNECT_TIMEOUT = 10.0


@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_pool
    retries = 0

    while retries < MAX_RETRIES:
        try:
            db_pool = await asyncpg.create_pool(
                DATABASE_URL,
                min_size=5,
                max_size=20,
                timeout=CONNECT_TIMEOUT
            )
            print("✅ Database connected")
            break
        except (asyncpg.CannotConnectNowError, ConnectionRefusedError, OSError) as e:
            retries += 1
            print(f"⚠️ Database not ready (attempt {retries}/{MAX_RETRIES}): {e}")
            if retries < MAX_RETRIES:
                print(f"⏳ Retrying in {RETRY_DELAY} seconds...")
                await asyncio.sleep(RETRY_DELAY)
            else:
                print("❌ Failed to connect to database after multiple attempts.")
                raise RuntimeError("Database connection failed")

    yield

    if db_pool:
        await db_pool.close()
        print("❌ Database disconnected")


async def get_db():
    async with db_pool.acquire() as connection:
        yield connection