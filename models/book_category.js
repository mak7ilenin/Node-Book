const { DataTypes, Model, Sequelize } = require('sequelize');
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
        }
    },
    // {
    //     indexes: [
    //         {
    //             unique: true,
    //             fields: ['book_id', 'category_id']
    //         }
    //     ]
    // },
    {
        sequelize: db,
        modelName: 'book_category'
    },
    // Book.belongsToMany(Category, {through: BookCategory}),
    // Category.belongsToMany(Book, {through: BookCategory})
    // Book.hasMany(Category)
);

module.exports = BookCategory;