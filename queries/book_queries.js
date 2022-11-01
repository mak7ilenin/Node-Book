// const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Book = require('../models/book');
const Category = require('../models/category');
const BookCategory = require('../models/book_category');

module.exports = async function createBook(books) {
    const publishedDate = books.map(book => book.publishedDate);
    const authors = books.map(book => book.authors);
    const categories = books.map(book => book.categories);
    let categoriesArr = [];
    categories.forEach(el => {
        for (let i = 0; i < el.length; i++) {
            if(el[i] != '') {
                categoriesArr.push(el[i]);
            }
        }
    });
    let uniqCategoriesArr = new Set(categoriesArr);
    const uniqCategories = Array.from(uniqCategoriesArr);
    
    for (let i = 0; i < books.length; i++) {
        let book = await Book.create({
            title: books[i].title,
            isbn: books[i].isbn != null ? books[i].isbn : '',
            pageCount: books[i].pageCount,
            // publishedDate: publishedDate[i].$date != undefined && publishedDate[i] != undefined ? publishedDate[i].$date : '',
            thumbnailUrl: books[i].thumbnailUrl,
            shortDescription: books[i].shortDescription != undefined ? books[i].shortDescription : '',
            longDescription: books[i].longDescription != undefined ? books[i].longDescription : '',
            status: books[i].status
        })

        for (let i = 0; i < uniqCategories.length; i++) {
            let name = uniqCategories[i].charAt(0).toUpperCase() + uniqCategories[i].slice(1)
            let category = await Category.findOne({
                where: { name: name },
                attributes: ['id'],
                raw: true
            });
            if(category == null) {
                await Category.create({name: name})
            }
            else {
                await BookCategory.create({book_id: book.id, category_id: category.id})   
            }
        }
        // try {
        // } catch (error) {
        //     console.log(error);
        // }
    }
}