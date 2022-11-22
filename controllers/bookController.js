const Book = require('../models/book');
const Author = require('../models/author');
const Category = require('../models/category');
const BookCategory = require('../models/book_category');
const Sequelize = require('sequelize');
const Operator = Sequelize.Op;

// Create book
exports.create = async (req, res) => {
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
        status: req.body.status
    };

    // Save book
    await Book.create(book)
        .then(() => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to create book!'
            });
        });

    // const thisBook = await Book.findOne({
    //     where: { isbn: req.body.isbn },
    //     attributes: ['id']
    // });
    // let categories = req.body.categories;
    // let category = null;
    // for (let i = 0; i < categories.length; i++) { 
    //     category = await Category.findOne({
    //         where: {
    //             name: categories[i]
    //         }
    //     });
    // }
    // if(category != null) {
    //     BookCategory.create({
    //         bookId: thisBook.id,
    //         categoryId: category.id
    //     })
    // }
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
    if (!req.params.id) {
        res.status(400).send({
            message: 'No book selected!'
        });
        return;
    }

    Book.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(res.status(200).send({
        message: `Book ${req.params.id} deleted!`
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
    if(!req.params.title) {
        res.status(400).send({
            message: 'No title provided!'
        });
        return;
    }
    Book.findAll({
        where: {
            title: { [Operator.like]: `%${req.params.title}%` }
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
    if(!req.params.authorId) {
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
                    id: req.params.authorId 
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
    if(!req.params.category) {
        res.status(400).send({
            message: 'No category id provided!'
        });
        return;
    }
    const category = await Category.findOne({
        where: { name: req.params.category },
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