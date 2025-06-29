#!/usr/bin/env python3
"""
WebSockets Real-time Demo Server
A comprehensive example of WebSockets Real-time implementation.
"""

from flask import Flask, jsonify, request
import json
from datetime import datetime

app = Flask(__name__)

# Sample data
sample_data = {
    "message": "Welcome to WebSockets Real-time demo!",
    "timestamp": datetime.now().isoformat(),
    "features": [
        "RESTful API endpoints",
        "JSON data handling",
        "Error handling",
        "Production-ready structure"
    ]
}

@app.route('/')
def home():
    return jsonify({
        "service": "WebSockets Real-time",
        "status": "running",
        "endpoints": [
            "/api/demo",
            "/api/health",
            "/api/data"
        ]
    })

@app.route('/api/demo')
def demo():
    return jsonify(sample_data)

@app.route('/api/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "WebSockets Real-time",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/data', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        data = request.get_json()
        return jsonify({
            "message": "Data received successfully",
            "received_data": data,
            "timestamp": datetime.now().isoformat()
        })
    else:
        return jsonify({
            "data": sample_data,
            "timestamp": datetime.now().isoformat()
        })

if __name__ == '__main__':
    print(f"Starting WebSockets Real-time demo server...")
    print("Visit: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
