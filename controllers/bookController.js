const Book = require('../models/book');
const Author = require('../models/author');
const Category = require('../models/category');
const Sequelize = require('sequelize');
const Operator = Sequelize.Op;

// Create book
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

// Get all books
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

// Book delete
exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No book selected!'
        });
        return;
    }

    Book.destroy({
        where: {
            id: req.body.id
        }
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

// Update book
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

// Get books by title
exports.getByTitle = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: 'No title provided!'
        });
        return;
    }
    Book.findAll({
        where: {
            title: { [Operator.like]: `%${req.body.title}%` }
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to get books!'
        });
    });
}

// Get books by author
exports.getByAuthorId = (req, res) => {
    if(!req.body.authorId) {
        res.status(400).send({
            message: 'No author id provided!'
        });
        return;
    }
    Book.findAll({
        include: [
            {
                model: Author,
                where: {
                    id: req.body.authorId 
                }
            }
        ]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to get books!'
        });
    });
}

// Get books by category
exports.getByCategory = async (req, res) => {
    if(!req.body.category) {
        res.status(400).send({
            message: 'No category id provided!'
        });
        return;
    }
    const category = await Category.findOne({
        where: { name: req.body.category },
        attributes: ['id']
    });
    Book.findAll({
        attributes: [
            'title', 'isbn', 'pageCount', 'publishedDate', 
            'longDescription', 'shortDescription', 'status'
        ],
        include: [
            {
                model: Category,
                where: {
                    id: category.id
                },
                attributes: ['id', 'name']
            },
        ]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to get books!'
        });
    });
}