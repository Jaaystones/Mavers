const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mavers API',
      version: '1.0.0',
      description: 'API documentation for the Mavers backend application - A task management and reminder system for Mavers Travels and Tours.',
      contact: {
        name: 'Joel Paul',
        email: 'support@mavers.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    path.join(__dirname, '*.swagger.js')
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Save the generated spec for reference
fs.writeFileSync(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2));

module.exports = {
  swaggerUi,
  swaggerSpec,
};