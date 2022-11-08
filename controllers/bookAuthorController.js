const BookAuthor = require('../models/book_author');

// Create book author
exports.create = (req, res) => {
    if (!req.body.book_id || !req.body.author_id) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // Create book author
    const book_author = {
        book_id: req.body.book_id,
        author_id: req.body.author_id
    };

    // Save book author
    BookAuthor.create(book_author)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to create book author!'
            });
        });
}

// Get all book authors
exports.findAll = (req, res) => {
    BookAuthor.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to get book authors!'
            })
        })
}

// Book author delete
exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No book author category selected!'
        });
        return;
    }

    BookAuthor.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(res.status(200).send({
        message: `Book author ${req.body.id} deleted!`
    }))
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to delete book author!'
        });
    });
}

// Book author update
exports.update = (req, res) => {
    BookAuthor.upsert({
        id: req.body.id,
        book_id: req.body.book_id,
        author_id: req.body.author_id
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to update book author!'
        });
    });
}