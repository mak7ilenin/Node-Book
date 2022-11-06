const Book = require('../models/book');

// Create method for book
exports.create = (req, res) => {
    if(!req.body.title || !req.body.isbn) {
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