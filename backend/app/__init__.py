from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.database import db
from app.routes.metrics import metrics_bp
from app.swagger import init_swagger


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    app.register_blueprint(metrics_bp)

    init_swagger(app)

    with app.app_context():
        from app.models.metric import Metric

        db.create_all()

    return app