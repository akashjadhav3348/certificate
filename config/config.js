module.exports = {
  PORT: process.env.PORT || 5000,
  API_DOCS_PATH: '/api-docs',
  SECRET: 'your-secret-key-here',

  SWAGGER_OPTIONS: {
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
          description: 'Local development server',
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
                example: '29001'
              },
              studentName: {
                type: 'string',
                example: 'Akash Jadhav'
              },
              courseName: {
                type: 'string',
                example: 'Full Stack Developer'
              },
              startDate: {
                type: 'string',
                format: 'date',
                example: '2025-01-01'
              },
              endDate: {
                type: 'string',
                format: 'date',
                example: '2025-06-30'
              }
            }
          }
        }
      }
    },
    apis: ['./routes/*.js'],
  }
};
