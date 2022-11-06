// Routing
const express = require('express');
const app = express();
const router = require('./routes/router');

app.use('/', router);
app.listen(3000);
// -------------------

const db = require('./config/database');
const books_json = require('./data/books_json');
const createBooks = require('./data/insert_data');

// Initialize models
let Category = require('./models/category');
let Book = require('./models/book');
let Author = require('./models/author');
let BookCategory = require('./models/book_category');
let BookAuthor = require('./models/book_author');

// Book references
Book.belongsToMany(Author, { through: BookAuthor });
Book.belongsToMany(Category, { through: BookCategory });

// Author references
Author.belongsToMany(Book, { through: BookAuthor });

// Category references
Category.belongsToMany(Book, { through: BookCategory });
// ---------------------

// JSON parsing -> creation
async function fetchBooks() {
    const str_books_json = JSON.stringify(books_json);
    const books = JSON.parse(str_books_json);
    await db.sync({ alter: true });
    return books
}
fetchBooks().then(books => {
    createBooks(books);
});