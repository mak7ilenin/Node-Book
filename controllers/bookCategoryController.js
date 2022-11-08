const BookCategory = require('../models/book_category');

// Create book category
exports.create = (req, res) => {
    if (!req.body.book_id || !req.body.category_id) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // Create book
    const book_category = {
        book_id: req.body.book_id,
        category_id: req.body.category_id
    };

    // Save book
    BookCategory.create(book_category)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to create book category!'
            });
        });
}

// Get all book categories
exports.findAll = (req, res) => {
    BookCategory.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to get book categories!'
            })
        })
}

// Book category delete
exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No book category selected!'
        });
        return;
    }

    BookCategory.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(res.status(200).send({
        message: `Book category ${req.body.id} deleted!`
    }))
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to delete book category!'
        });
    });
}

// Book category update
exports.update = (req, res) => {
    BookCategory.upsert({
        id: req.body.id,
        book_id: req.body.book_id,
        category_id: req.body.category_id
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to update book category!'
        });
    });
}