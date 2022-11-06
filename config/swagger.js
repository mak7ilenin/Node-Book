module.exports = async function initSwagger(app) {
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
        definition: {
            openapi: "3.0.0",
            servers: [
                {
                    url: 'http://localhost:3000/',
                    description: 'Development server',
                },
            ],
        },
        apis: ['./routes/*'],
    };
    const specs = swaggerJsdoc(options);
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );
}