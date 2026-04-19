def prepare_history(df):
    history = []

    for index, row in df.iterrows():
        history.append({
            "date": str(index.date()),
            "close": float(row["Close"])
        })

    return history