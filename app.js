const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config/config');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// Swagger setup
const specs = swaggerJsdoc(config.SWAGGER_OPTIONS);
app.use(config.API_DOCS_PATH, swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/certificates', certificateRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to Certificate Management API');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
