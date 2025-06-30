const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const certificateRoutes = require('./routes/certificateRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Certificate API',
      version: '1.0.0',
      description: 'Certificate Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
 components: {
  schemas: {
    Certificate: {
      type: 'object',
      required: ['studentName', 'courseName'],
      properties: {
        certificateNo: {
          type: 'string',
          readOnly: true,
          example: '29001'
        },
        studentName: {
          type: 'string',
          example: 'Enter Name'
        },
        courseName: {
          type: 'string',
          example: 'Enter Course Name'
        },
        startDate: {
          type: 'string',
          format: 'date',
          example: 'Enter Start Date'
        },
        endDate: {
          type: 'string',
          format: 'date',
          example: 'Enter End Date'
        }
      }
    }
  }
}

  },
  apis: ['./routes/*.js', './controllers/*.js'],
};
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Connect Backend');
});

const specs = swaggerJsdoc(options);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/certificates', certificateRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
