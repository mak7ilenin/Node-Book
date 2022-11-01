const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);

const db = require('./config/database');
const books_json = require('./data/books_json');
const createBook = require('./queries/book_queries');

// Create tables in database
// ---------------------
let Category = require('./models/category');
let Book = require('./models/book');
let Author = require('./models/author');
let BookCategory = require('./models/book_category');
let BookAuthor = require('./models/book_author');
// ---------------------

// Create method
db.sync({ alter: true });

// Books parsing
// ---------------------
async function fetchBooks() {
    // const response = await fetch('./data/books_json.json')
    const str_books_json = JSON.stringify(books_json);
    const books = JSON.parse(str_books_json);
    return books
}
// ---------------------
fetchBooks().then(books => {
    createBook(books);
});

module.exports = app;