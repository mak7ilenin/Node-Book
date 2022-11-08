const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');
const Book = require('./book');
const Category = require('./category');

class BookCategory extends Model {}
BookCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book,
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
    },
    {
        sequelize: db,
        modelName: 'book_category',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['bookId', 'categoryId']
            }
        ]
    }
);

module.exports = BookCategory;