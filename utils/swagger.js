// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API for managing tasks',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Task: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              example: '123abc',
            },
            title: {
              type: 'string',
              example: 'Finish homework',
            },
              description: {
              type: 'string',
              example: 'heyyyy maaan',
            },
              status: {
              type: 'string',
              example: 'pending',
            },
            DueDate: {
              type:Date
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // or wherever your routes are
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
