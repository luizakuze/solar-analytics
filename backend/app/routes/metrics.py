from flask import Blueprint, jsonify, request

from app.services.metrics_service import (
    create_metric,
    get_all_metrics,
    get_latest_metric,
    get_metrics_summary,
)

metrics_bp = Blueprint("metrics", __name__)


@metrics_bp.route("/", methods=["GET"])
def home():
    """
    API Status
    ---
    tags:
      - Status
    responses:
      200:
        description: API online
    """
    return jsonify({"message": "Solar Analytics API Running"})


@metrics_bp.route("/metrics", methods=["GET"])
def metrics():
    """
    Listar métricas solares
    ---
    tags:
      - Metrics
    responses:
      200:
        description: Lista de métricas solares
    """
    return jsonify(get_all_metrics())


@metrics_bp.route("/metrics", methods=["POST"])
def add_metric():
    """
    Criar métrica solar
    ---
    tags:
      - Metrics
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - power_kw
            - panel_temperature
            - solar_irradiation
          properties:
            power_kw:
              type: number
              example: 3.5
            panel_temperature:
              type: number
              example: 42.1
            solar_irradiation:
              type: number
              example: 780
    responses:
      201:
        description: Métrica criada
      400:
        description: Dados inválidos
    """
    data = request.get_json()

    required_fields = ["power_kw", "panel_temperature", "solar_irradiation"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    metric = create_metric(data)

    return jsonify(metric), 201


@metrics_bp.route("/metrics/latest", methods=["GET"])
def latest_metric():
    """
    Buscar métrica mais recente
    ---
    tags:
      - Metrics
    responses:
      200:
        description: Métrica mais recente
      404:
        description: Nenhuma métrica encontrada
    """
    metric = get_latest_metric()

    if metric is None:
        return jsonify({"message": "No metrics found"}), 404

    return jsonify(metric)


@metrics_bp.route("/metrics/summary", methods=["GET"])
def metrics_summary():
    """
    Buscar resumo das métricas
    ---
    tags:
      - Metrics
    responses:
      200:
        description: Resumo das métricas solares
    """
    return jsonify(get_metrics_summary())