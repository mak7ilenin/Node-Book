module.exports = app => {
    const bookCategory = require('../../controllers/bookCategoryController');
    const router = require('express').Router();

    // Get all book categories
    router.get('/', bookCategory.findAll);
    // Create new book category
    router.post('/', bookCategory.create);
    // Delete book category
    router.delete('/', bookCategory.delete);
    // Update book category
    router.put('/', bookCategory.update);

    app.use('/b-category', router)
}