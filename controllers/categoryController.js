const Category = require('../models/category');

// Create method for category
exports.create = (req, res) => {
    if(!req.body.name) {
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