const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../config/database');

class Author extends Model {}
Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'author'
    }
);

module.exports = Author;