// /**
// * @swagger
// * components:
// *   schemas:
// *       Category:
// *           type: object
// *           required:
// *               — name
// *           properties:
// *               id:
// *                   type: integer
// *                   description: The auto-generated id of the category.
// *               name:
// *                   type: string
// *                   description: The name of category.
// *           example:
// *               name: Open Source
// */
module.exports = app => {
    const categories = require('../controllers/categoryController');
    const router = require('express').Router();

    // Get all categories
    router.get('/', categories.findAll);
    // Create new category
    router.post('/', categories.create);
    // Delete category
    router.delete('/', categories.delete);
    // Update category
    router.put('/', categories.update);
    // --------------------------------

    // Get categories and books amount in each category
    router.get('/b-count', categories.getBooksCountInCategory)

    // /**
    // * @swagger
    // * /api/categories:
    // *    get:
    // *       summary: Retrieve a list of categories.
    // *       responses:
    // *           200:
    // *               description: A List of books:
    // *               content:
    // *                   application/json:
    // *                       schema:
    // *                           type: object
    // *                           properties:
    // *                               id:
    // *                                   type: integer
    // *                                   description: The auto-generated id of the category
    // *                               name: 
    // *                                   type: string
    // *                                   description: The name of category
    // */

    app.use('/api/categories', router)
}
