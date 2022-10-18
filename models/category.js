const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../config/database');

class Category extends Model {}
Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
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
        modelName: 'category'
    }
);

module.exports = Category;