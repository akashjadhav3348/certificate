module.exports = {
  PORT: process.env.PORT || 5000,
  API_DOCS_PATH: '/api-docs',
  SECRET: 'your-secret-key-here', // For session if needed
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
        },
      ],
    },
    apis: ['./routes/*.js'],
  }
};