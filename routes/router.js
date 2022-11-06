const db = require('../config/database');
const express = require('express');

// Import routes
const books = require('./books');
const authors = require('./authors');
const categories = require('./categories');

const router = express.Router();
router.use('/books', books);

module.exports = router;