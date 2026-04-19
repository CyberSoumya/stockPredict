import yfinance as yf
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from utils import prepare_history

def predict_stock(symbol):
    df = yf.download(symbol, period="2y")

    if df.empty:
        raise ValueError("Invalid stock symbol")

    data = df[['Close']]

    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(data)

    # Simple prediction: average of last 60 days
    last_60 = scaled[-60:]
    prediction_scaled = np.mean(last_60)

    predicted_price = scaler.inverse_transform([[prediction_scaled]])[0][0]
    current_price = data.iloc[-1].values[0]

    signal = "BUY" if predicted_price > current_price else "SELL"

    # Prepare history for chart
    history = prepare_history(df)

    return {
        "symbol": symbol.upper(),
        "current_price": float(current_price),
        "predicted_price": float(predicted_price),
        "signal": signal,
        "history": history
    }