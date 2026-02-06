import random
import time
import logging
from flask import Flask, jsonify

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.route('/')
def home():
    logging.info("Homepage accessed")
    return jsonify({"status": "running", "service": "sre-demo-app"})

@app.route('/error')
def trigger_error():
    logging.error("Intentional error triggered!")
    logging.error("Connection refused to database:5432")
    raise Exception("Database connection failed")

@app.route('/slow')
def slow_endpoint():
    delay = random.uniform(2, 5)
    logging.warning(f"Slow request - taking {delay:.2f}s")
    time.sleep(delay)
    logging.error("Timeout warning: request took too long")
    return jsonify({"status": "slow", "delay": delay})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
