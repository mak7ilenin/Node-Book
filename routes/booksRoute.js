module.exports = (app, router) => {
    const books = require('../controllers/bookController');

    // Get all books
    router.get('/', books.findAll);

    // Create new book
    router.post('/', books.create);

    app.use('/api/books', router)
}