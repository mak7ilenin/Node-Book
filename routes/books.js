const db = require('../config/database');
const express = require('express');

const router = express.Router();
router.get('/books', (req, res) => {
    db.query("SELECT `id`, `title` FROM `books` ORDER BY `title`", function(error, results) {
        if(error) throw error;
        return res.send({data: results});
    });
});

module.exports = router;