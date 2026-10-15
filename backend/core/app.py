from fastapi import FastAPI

from backend.routes.health import router as health_router
from backend.routes.upload import router as upload_router
from backend.routes.validation import router as validation_router

app = FastAPI(
    title="FuelIQ AI",
    description="Agentic Fleet Sustainability and Emission Intelligence Platform",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(validation_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to FuelIQ AI"
    }