const { DataTypes, Model } = require('sequelize');
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
    },
    {
        sequelize: db,
        modelName: 'category',
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Category;