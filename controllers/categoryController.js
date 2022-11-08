const Category = require('../models/category');

// Get all
exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to get categories!'
            })
        })
}

// Create
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // Create category
    const category = {
        name: req.body.name,
    };

    // Save category
    Category.create(category)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to create category!'
            });
        });
}

exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No category selected!'
        });
        return;
    }

    // Category delete
    Category.destroy({
        where: {
            id: req.body.id
        },
        force: true
    })
    .then(res.status(200).send({
        message: `Category ${req.body.id} deleted!`
    }))
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to delete category!'
        });
    });
}

exports.update = (req, res) => {
    Category.upsert({
        id: req.body.id,
        name: req.body.name,
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to update category!'
        });
    });
}