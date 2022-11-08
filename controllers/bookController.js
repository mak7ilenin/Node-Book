const Book = require('../models/book');

// Create method for book
exports.create = (req, res) => {
    if (!req.body.title || !req.body.isbn) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // Create book
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,
    };

    // Save book
    Book.create(book)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to create book!'
            });
        });
}

exports.findAll = (req, res) => {
    Book.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to get books!'
            })
        })
}

exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No book selected!'
        });
        return;
    }

    // Book delete
    Book.destroy({
        where: {
            id: req.body.id
        },
        force: true
    })
    .then(res.status(200).send({
        message: `Book ${req.body.id} deleted!`
    }))
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to delete book!'
        });
    });
}

exports.update = (req, res) => {
    Book.upsert({
        id: req.body.id,
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount  || 0,
        publishedDate: req.body.publishedDate || null,
        thumbnailUrl: req.body.thumbnailUrl || '',
        shortDescription: req.body.shortDescription || '',
        longDescription: req.body.longDescription || '',
        status: req.body.status || 'NOT PUBLISH',
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to update book!'
        });
    });
}