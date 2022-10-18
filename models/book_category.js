const { DataTypes, Model} = require('sequelize');
const db = require('../config/database');
const Book = require('./book');
const Category = require('./category');

class BookCategory extends Model {}
BookCategory.init(
    {
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book,
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        }
    },
    {
        sequelize: db,
        modelName: 'book_category'
    },
    Book.hasMany(Category)
);

module.exports = BookCategory;