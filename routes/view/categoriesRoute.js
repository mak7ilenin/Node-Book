module.exports = app => {
    const categories = require('../../controllers/categoryController');
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

    app.use('/categories', router)
}
