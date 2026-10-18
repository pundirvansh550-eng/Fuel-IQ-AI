from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.health import router as health_router
from backend.routes.upload import router as upload_router
from backend.routes.validation import router as validation_router
from backend.routes.insights import router as insights_router
from backend.routes.analytics import router as analytics_router
from backend.routes.schema import router as schema_router
from backend.routes.profile import router as profile_router
from backend.routes.recommendation import router as recommendation_router
from backend.routes.sustainability import router as sustainability_router
from backend.routes.risk import router as risk_router
from backend.routes.dashboard import router as dashboard_router
from backend.routes.intelligence import router as intelligence_router
from backend.routes.dataset_preview import router as dataset_preview_router
from backend.routes.export import router as export_router
from backend.routes.manufacturer_chart import router as manufacturer_chart_router
from backend.routes.vehicle_class_chart import router as vehicle_class_chart_router
from backend.routes.analytics_insights import router as analytics_insights_router

app = FastAPI(
    title="FuelIQ AI",
    description="Agentic Fleet Sustainability and Emission Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(validation_router)
app.include_router(insights_router)
app.include_router(analytics_router)
app.include_router(schema_router)
app.include_router(profile_router)
app.include_router(recommendation_router)
app.include_router(sustainability_router)
app.include_router(risk_router)
app.include_router(dashboard_router)
app.include_router(intelligence_router)
app.include_router(dataset_preview_router)
app.include_router(export_router)
app.include_router(manufacturer_chart_router)
app.include_router(vehicle_class_chart_router)
app.include_router(analytics_insights_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to FuelIQ AI"
    }