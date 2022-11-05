const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../config/database');

class Author extends Model {}
Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    },
    {
        sequelize: db,
        modelName: 'author',
        timestamps: true,
    }
);

module.exports = Author;