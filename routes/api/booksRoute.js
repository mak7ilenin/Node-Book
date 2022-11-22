module.exports = app => {
    const books = require('../../controllers/bookController');
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
    
    app.use('/api/books', router)
}