module.exports = app => {
    const authors = require('../../controllers/authorController');
    const router = require('express').Router();

    // Get all authors
    router.get('/', authors.findAll);
    // Create new author
    router.post('/', authors.create);
    // Delete author
    router.delete('/', authors.delete);
    // Update author
    router.put('/', authors.update);

   app.use('/authors', router)
}
