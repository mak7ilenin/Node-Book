// NPM require
const express = require('express');
const cors = require('cors');

// Routing
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/categoriesRoute')(app);
require('./routes/authorsRoute')(app);
require('./routes/booksRoute')(app);
require('./routes/bookAuthorRoute')(app);
require('./routes/bookCategoryRoute')(app);

app.listen(3000);
// -------------------

// Models references
let Category = require('./models/category');
let Book = require('./models/book');
let Author = require('./models/author');
let BookCategory = require('./models/book_category');
let BookAuthor = require('./models/book_author');

Book.belongsToMany(Author, { through: BookAuthor });
Book.belongsToMany(Category, { through: BookCategory });
// ----------------------------------------------------
Author.belongsToMany(Book, { through: BookAuthor });
// ------------------------------------------------
Category.belongsToMany(Book, { through: BookCategory });
// ----------------------------------------------------

// JSON parsing -> creation
const db = require('./config/database');
const books_json = require('./data/books_json');
const createBooks = require('./data/insert_data');

async function fetchBooks() {
    const str_books_json = JSON.stringify(books_json);
    const books = JSON.parse(str_books_json);
    await db.sync({ alter: true });
    return books;
}
fetchBooks().then(books => {
    createBooks(books);
});
// -------------------------

// Swagger configuration
// const initSwagger = require('./config/swagger');
// initSwagger(app);