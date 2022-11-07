const Author = require('../models/author');

// Create method for author
exports.create = (req, res) => {
    if(!req.body.full_name) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }
    
    // Create author
    const author = {
        name: req.body.full_name,
    };
    
    // Save author
    Author.create(author)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to create author!'
            });
        });
}

exports.findAll = (req, res) => {
    Author.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Unable to get authors!'
            })
        })
}