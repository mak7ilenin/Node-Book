const { Sequelize } = require('sequelize');
const db = require('./config/database.js');

const Category = require('./models/category');
Category.sync({ force: true });