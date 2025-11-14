FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system deps required by asyncpg (Postgres)
RUN apt-get update && apt-get install -y gcc libpq-dev && apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app files
COPY . .

# Expose port (Railway uses PORT env var)
EXPOSE 8000

# Command to run FastAPI app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]