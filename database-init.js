const db = require('./config/database.js');

let Category = require('./models/category');
let Book = require('./models/book');
let Author = require('./models/author');
let BookCategory = require('./models/book_category');
let BookAuthor = require('./models/book_author');

db.sync({ alter: true });