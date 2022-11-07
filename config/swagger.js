module.exports = function initSwagger(app) {
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: 'Books API',
                version: '0.1.0',
                contact: {
                    name: 'SvinDzjuba GitHub',
                    url: 'https://github.com/SvinDzjuba',
                },
            },
            server: 'http://localhost:3000/'
        },
        apis: ['./routes/*'],
    };
    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};