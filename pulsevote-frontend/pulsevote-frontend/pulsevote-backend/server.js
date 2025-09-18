const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const http = require('http');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
let server;

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("Error: MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");

    // Try HTTPS first
    try {
      const options = {
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/cert.pem'),
      };
      server = https.createServer(options, app);
      console.log("HTTPS enabled");
    } catch (err) {
      console.log("SSL files not found, running HTTP instead");
      server = http.createServer(app);
    }

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} in use, trying port ${PORT + 1}`);
        server.listen(PORT + 1);
      } else {
        console.error(err);
      }
    });

  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
