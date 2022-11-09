const books = require('../controllers/bookController');
const content = require

exports.findAll = content => (req, res) => {
    books.findAll()
    .then(data => {
        let jsonStr = JSON.stringify(data);
        let booksRes = JSON.parse(jsonStr);
        
        // const content = document.querySelector('#content');
        // for (let i = 0; i < booksRes.length; i++) {
        //         content.innerHTML(booksRes[i].title);
                
        //     }
    })
}