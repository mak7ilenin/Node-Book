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

exports.delete = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: 'No author selected!'
        });
        return;
    }

    // Author delete
    Author.destroy({
        where: {
            id: req.body.id
        },
        force: true
    })
    .then(res.status(200).send({
        message: `Author ${req.body.id} deleted!`
    }))
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to delete author!'
        });
    });
}

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