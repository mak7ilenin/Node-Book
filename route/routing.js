const app = require("../App");
const db = require('../config/database');

app.get('/books', function(req, res) {
    db.query('SELECT id, title FROM books ORDER BY title', function(error, results) {
        if(error) throw error;
        return res.send({data: results});
    });
});