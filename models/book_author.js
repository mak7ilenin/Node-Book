const { Sequelize } = require('sequelize');
const db = require('../config/database');

const BookAuthor = db.define('book_author', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    book_id: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = BookAuthor;