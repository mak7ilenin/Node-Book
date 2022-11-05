const express = require('express');
const app = express();

const books_json = require('./data/books_json');
const createBook = require('./queries/book_queries');

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

// Books parsing
async function fetchBooks() {
    // const response = await fetch('./data/books_json.json')
    const str_books_json = JSON.stringify(books_json);
    const books = JSON.parse(str_books_json);
    await Book.sync();
    await Category.sync();
    await Author.sync();
    await BookCategory.sync();
    await BookAuthor.sync();
    return books
}
// ---------------------
fetchBooks().then(books => {
    createBook(books);
});

// Connect to port(3000)
app.use(express.json());
app.listen(3000);

module.exports = app;