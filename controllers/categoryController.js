const Category = require('../models/category');

// Get all categories
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

// Create category
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

// Category delete
exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No category selected!'
        });
        return;
    }

    Category.destroy({
        where: {
            id: req.body.id
        }
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

// Update category
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