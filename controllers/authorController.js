const Author = require('../models/author');

// Create author
exports.create = (req, res) => {
    if(!req.body.full_name) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }
    
    // Create author
    const author = {
        full_name: req.body.full_name,
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

// Get all authors
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

// Author delete
exports.delete = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: 'No author selected!'
        });
        return;
    }

    Author.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(res.status(200).send({
        message: `Author ${req.params.id} deleted!`
    }))
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to delete author!'
        });
    });
}

// Author update
exports.update = (req, res) => {
    Author.upsert({
        id: req.body.id,
        full_name: req.body.full_name,
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to update author!'
        });
    });
}