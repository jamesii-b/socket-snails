const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const Order = require('./models/order'); // Update the path as needed

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
require('dotenv').config();
// Connect to your MongoDB database
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your WebSocket logic
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.send("hello from the server")
  // Send JSON data from the database when a WebSocket connection is established
  Order.find({})
    .exec()
    .then((salesData) => {
      ws.send(JSON.stringify(salesData));
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  // Handle WebSocket messages (if needed)
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle WebSocket closure
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Define your Express routes (salesController.js)
const salesController = require('./controller/sales'); // Update the path as needed

app.get('/sales', salesController.getAllSales);

// Start the Express server

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
