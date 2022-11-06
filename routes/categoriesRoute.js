/**
* @swagger
* components:
*   schemas:
*       Category:
*           type: object
*           required:
*               — name
*           properties:
*               id:
*                   type: integer
*                   description: The auto-generated id of the category.
*               name:
*                   type: string
*                   description: The name of category.
*           example:
*               name: RESTful API
*/

module.exports = (app, router) => {
    const categories = require('../controllers/categoryController');

    // Create new category
    router.post('/', categories.create);

    /**
    * @swagger
    * /api/categories:
    *    get:
    *       summary: Retrieve a list of categories.
    *       description: Retrieve a List of categories.
    *       responses:
    *           200:
    *               description: A List of categories.
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                           properties:
    *                               data:
    *                                   type: array
    *                                   items:
    *                                       type: object
    *                                       properties:
    *                                           id:
    *                                               type: integer
    *                                               description: The category ID.
    *                                               example: 1
    *                                           name:
    *                                               type: string
    *                                               description: The category's name.
    *                                               example: RESTful API
    */

   // Get all categories
   router.get('/', categories.findAll);
   app.use('/api/categories', router)
}
