module.exports = app => {
    const bookAuthor = require('../controllers/bookAuthorController');
    const router = require('express').Router();

    // Get all book authors
    router.get('/', bookAuthor.findAll);
    // Create new book author
    router.post('/', bookAuthor.create);
    // Delete book author
    router.delete('/', bookAuthor.delete);
    // Update book author
    router.put('/', bookAuthor.update);

    app.use('/api/b-author', router)
}