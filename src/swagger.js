const swaggerAutogen = require('swagger-autogen');

const output = './swagger_doc.json';
const endpoints = ['./app.js'];
const doc = {
    info: {
        version: '1.0.0',
        title: 'REST API',
        description: 'API para gerenciamento de usuários'
    },
        host: 'localhost:3000',
        basePath: '/',
        schemes: ['http'],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http", 
                scheme: "bearer", 
                bearerFormat: "JWT", 
            },
        },
    },
    security: [
        {
            bearerAuth: [], 
        },
    ],
}

swaggerAutogen(output, endpoints, doc);