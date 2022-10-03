const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Category = db.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
});

module.exports = Category;