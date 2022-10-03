const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Book = db.define('Book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    isbn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pageCount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    publishedDate: {
        type: Sequelize.DATE,
    },
    thumbnailUrl: {
        type: Sequelize.STRING(MAX)
    },
    shortDescription: {
        type: Sequelize.STRING(MAX)
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Book;