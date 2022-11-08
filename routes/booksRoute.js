// /**
// * @swagger
// * components:
// *   schemas:
// *       Book:
// *           type: object
// *           required:
// *               — title
// *               — isbn
// *           properties:
// *               id:
// *                   type: integer
// *                   description: The auto-generated id of the book.
// *               title:
// *                   type: string
// *               isbn:
// *                   type: bigint
// *               pageCount:
// *                   type: integer
// *               publishedDate:
// *                   type: datetime
// *               thumbnailUrl:
// *                   type: string
// *               longDescription:
// *                   type: string
// *               shortDescription:
// *                   type: string
// *               status:
// *                   type: enum('PUBLISH', 'NOT PUBLISH')
// *           example:
// *               id: 123,
// *               title: Genius,
// *               isbn: 1231231232
// */
module.exports = app => {
    const books = require('../controllers/bookController');
    const router = require('express').Router();

    // Get all books
    router.get('/', books.findAll);
    // Create new book
    router.post('/', books.create);
    // Delete book
    router.delete('/', books.delete);
    // Update book
    router.put('/', books.update);
    // ---------------------------

    // Get books by title
    router.get('/title', books.getByTitle);
    // Get books by author(id)
    router.get('/author-id', books.getByAuthorId);
    // Get books by category
    router.get('/category', books.getByCategory);

    // /**
    // * @swagger
    // * /api/books:
    // *    get:
    // *       summary: Retrieve a list of books.
    // *       responses:
    // *           200:
    // *               description: A List of books:
    // *               content:
    // *                   application/json:
    // *                       schema:
    // *                           type: array
    // *                           items:
    // *                               $ref: '#/components/schemas/Book'
    // */

    app.use('/api/books', router)
}