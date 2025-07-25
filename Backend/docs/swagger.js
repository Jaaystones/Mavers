const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mavers API',
      version: '1.0.0',
      description: 'API documentation for the Mavers backend application.'
    },
    servers: [
      {
        url: 'http://localhost:5000',
      }
    ],
  },
  
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};