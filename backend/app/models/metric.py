from datetime import datetime

from app.database import db


class Metric(db.Model):
    __tablename__ = "metrics"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    power_kw = db.Column(db.Float, nullable=False)
    panel_temperature = db.Column(db.Float, nullable=False)
    solar_irradiation = db.Column(db.Float, nullable=False)
    estimated_efficiency = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp.isoformat(),
            "power_kw": self.power_kw,
            "panel_temperature": self.panel_temperature,
            "solar_irradiation": self.solar_irradiation,
            "estimated_efficiency": self.estimated_efficiency,
        }