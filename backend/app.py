from flask import Flask, request, jsonify
from flask_cors import CORS
from models import predict_stock

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Stock API Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    symbol = data.get("symbol")

    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    try:
        result = predict_stock(symbol)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)