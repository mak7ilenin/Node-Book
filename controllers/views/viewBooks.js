const Book = require('../../models/book');

exports.findAll = async (req, res) => {
    Book.findAll()
        .then(data => {
            let jsonStr = JSON.stringify(data);
            let booksRes = JSON.parse(jsonStr);

            res.render('books', { 
                title: 'Books Database Application', 
                heading: 'All Books',
                books: booksRes
            });
        });
}