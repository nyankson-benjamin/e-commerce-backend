const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv/config");

const port = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API for e-commerce"',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Paths to files where Swagger documentation is to be generated
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
