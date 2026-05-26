from app.database import db
from app.models.metric import Metric


def calculate_efficiency(power_kw, solar_irradiation):
    if solar_irradiation == 0:
        return 0

    return round(power_kw / solar_irradiation, 6)


def create_metric(data):
    power_kw = float(data["power_kw"])
    panel_temperature = float(data["panel_temperature"])
    solar_irradiation = float(data["solar_irradiation"])

    estimated_efficiency = calculate_efficiency(power_kw, solar_irradiation)

    metric = Metric(
        power_kw=power_kw,
        panel_temperature=panel_temperature,
        solar_irradiation=solar_irradiation,
        estimated_efficiency=estimated_efficiency,
    )

    db.session.add(metric)
    db.session.commit()

    return metric.to_dict()


def get_all_metrics():
    metrics = Metric.query.order_by(Metric.timestamp.asc()).all()
    return [metric.to_dict() for metric in metrics]


def get_latest_metric():
    metric = Metric.query.order_by(Metric.timestamp.desc()).first()

    if metric is None:
        return None

    return metric.to_dict()


def get_metrics_summary():
    metrics = Metric.query.all()

    if not metrics:
        return {
            "total_records": 0,
            "average_power_kw": 0,
            "max_power_kw": 0,
            "average_panel_temperature": 0,
            "average_solar_irradiation": 0,
            "average_estimated_efficiency": 0,
        }

    total = len(metrics)

    return {
        "total_records": total,
        "average_power_kw": round(sum(m.power_kw for m in metrics) / total, 2),
        "max_power_kw": round(max(m.power_kw for m in metrics), 2),
        "average_panel_temperature": round(
            sum(m.panel_temperature for m in metrics) / total, 2
        ),
        "average_solar_irradiation": round(
            sum(m.solar_irradiation for m in metrics) / total, 2
        ),
        "average_estimated_efficiency": round(
            sum(m.estimated_efficiency for m in metrics) / total, 6
        ),
    }