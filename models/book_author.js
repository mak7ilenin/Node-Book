const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');
const Book = require('./book');
const Author = require('./author');

class BookAuthor extends Model {}
BookAuthor.init(
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
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Author,
                key: 'id'
            }
        },
    },
    {
        sequelize: db,
        modelName: 'book_author',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['bookId', 'authorId']
            }
        ]
    }
);

module.exports = BookAuthor;