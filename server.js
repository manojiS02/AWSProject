const express = require('express');
const app = express();
const port = 3000;

// Health check endpoint for Kubernetes
app.get('/health', (req, res) => {
  res.status(200).send('Service is healthy');
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the Coinbase service 222!');
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Service running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
  });
});
