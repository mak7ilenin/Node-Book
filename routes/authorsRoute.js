// /**
// * @swagger
// * components:
// *   schemas:
// *       Author:
// *           type: object
// *           required:
// *               — name
// *           properties:
// *               id:
// *                   type: integer
// *                   description: The auto-generated id of the author.
// *               full_name:
// *                   type: string
// *                   description: The full name of author.
// *           example:
// *               name: RESTful API
// */
module.exports = app => {
    const authors = require('../controllers/authorController');
    const router = require('express').Router();

    // Get all authors
    router.get('/', authors.findAll);
    // Create new author
    router.post('/', authors.create);
    // Delete author
    router.delete('/', authors.delete);
    // Update author
    router.put('/', authors.update);
    
    // /**
    // * @swagger
    // * /api/authors:
    // *    get:
    // *       summary: Retrieve a list of authors.
    // *       description: Retrieve a List of authors.
    // *       responses:
    // *           200:
    // *               description: A List of authors:
    // *               content:
    // *                   application/json:
    // *                       schema:
    // *                           type: object
    // *                           properties:
    // *                               data:
    // *                                   type: array
    // *                                   items:
    // *                                       type: object
    // *                                       properties:
    // *                                           id:
    // *                                               type: integer
    // *                                               description: The author ID.
    // *                                               example: 1
    // *                                           full_name:
    // *                                               type: string
    // *                                               description: The author's full name.
    // */
   
   app.use('/api/authors', router)
}
