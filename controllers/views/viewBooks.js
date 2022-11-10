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

exports.createBook = async (req, res) => {
    await res.render('addBook');

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

    // Book.create(book)
    //     .then(data => {
    //         res.send(data);
    //         console.log('fdsfsdfsd');
    //     })
}