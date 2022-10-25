// const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Book = require('../models/book');
const Category = require('../models/category');
const BookCategory = require('../models/book_category');

module.exports = async function createBook(books) {
    const publishedDate = books.map(book => book.publishedDate);
    const authors = books.map(book => book.authors);
    const categories = books.map(book => book.categories);
    
    for (let i = 0; i < books.length; i++) {
        try {
            const book = await Book.create({
                title: books[i].title,
                isbn: books[i].isbn,
                pageCount: books[i].pageCount,
                publishedDate: publishedDate[i].$date != undefined ? publishedDate[i].$date : '',
                thumbnailUrl: books[i].thumbnailUrl,
                shortDescription: books[i].shortDescription != undefined ? books[i].shortDescription : '',
                longDescription: books[i].longDescription != undefined ? books[i].longDescription : '',
                status: books[i].status
            }).then(res => {console.log(res);
            }).catch(err => console.log(err));

            for (let i = 0; i < categories.length; i++) {
                let name = categories[i];
                const category = await Category.findOne({
                    where: {name: name},
                    attributes: ['id'],
                    raw: true
                });
                if(category == null) {
                    await Category.create({name: name})
                }
                if(category != null) {
                    await BookCategory.create({book_id: book.id, category_id: category.id})
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}