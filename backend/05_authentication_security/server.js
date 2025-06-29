#!/usr/bin/env node
/**
 * Authentication Security Demo Server
 * A comprehensive Node.js/Express example
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const sampleData = {
    message: "Welcome to Authentication Security demo!",
    timestamp: new Date().toISOString(),
    features: [
        "Express.js server",
        "RESTful API endpoints", 
        "JSON data handling",
        "CORS enabled",
        "Production-ready structure"
    ]
};

// Routes
app.get('/', (req, res) => {
    res.json({
        service: "Authentication Security",
        status: "running",
        endpoints: [
            "/api/demo",
            "/api/health", 
            "/api/data"
        ]
    });
});

app.get('/api/demo', (req, res) => {
    res.json(sampleData);
});

app.get('/api/health', (req, res) => {
    res.json({
        status: "healthy",
        service: "Authentication Security",
        timestamp: new Date().toISOString()
    });
});

app.route('/api/data')
    .get((req, res) => {
        res.json({
            data: sampleData,
            timestamp: new Date().toISOString()
        });
    })
    .post((req, res) => {
        res.json({
            message: "Data received successfully",
            receivedData: req.body,
            timestamp: new Date().toISOString()
        });
    });

// Start server
app.listen(PORT, () => {
    console.log(`Authentication Security demo server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  / - Service info');
    console.log('  GET  /api/demo - Demo data');
    console.log('  GET  /api/health - Health check');
    console.log('  GET  /api/data - Get data');
    console.log('  POST /api/data - Post data');
});
