const { DataTypes, Model } = require('sequelize');
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
        full_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
    },
    {
        sequelize: db,
        modelName: 'author',
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Author;