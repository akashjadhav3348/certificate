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
        url: 'https://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Certificate: {
          type: "object",
          required: ["certificateNo", "studentName", "courseName"],
          properties: {
            certificateNo: { type: "string", example: "C-12345" },
            studentName: { type: "string", example: "John Doe" },
            courseName: { type: "string", example: "Full Stack Development" },
            startDate: { type: "string", format: "date", example: "2024-01-01" },
            endDate: { type: "string", format: "date", example: "2024-06-01" },
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};
