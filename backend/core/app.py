from fastapi import FastAPI
from backend.routes.health import router as health_router

app = FastAPI(
    title="FuelIQ AI",
    description="Agentic Fleet Sustainability and Emission Intelligence Platform",
    version="1.0.0"
)

app.include_router(health_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to FuelIQ AI"
    }