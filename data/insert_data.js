const Book = require('../models/book');
const Category = require('../models/category');
const Author = require('../models/author');
const BookAuthor = require('../models/book_author');
const BookCategory = require('../models/book_category');

module.exports = async function createBooks(books) {
    const publishedDate = books.map(book => book.publishedDate);
    const categories = books.map(book => book.categories);
    const authors = books.map(book => book.authors);

    // Create categories
    let categoriesArr = [];
    categories.forEach(el => {
        for (let i = 0; i < el.length; i++) {
            if(el[i] != '') {
                let category_name = el[i].charAt(0).toUpperCase() + el[i].slice(1);
                categoriesArr.push(category_name);
            }
        }
    });
    const uniqCategoriesArr = new Set(categoriesArr);
    const uniqCategories = Array.from(uniqCategoriesArr);
    for (let i = 0; i < uniqCategories.length; i++) {
        await Category.findOrCreate({
            where: { name: uniqCategories[i] },
        });
    }
    // ----------------------------

    // Create authors
    let authorsArr = [];
    authors.forEach(el => {
        for (let i = 0; i < el.length; i++) {
            if(el[i] != '') {
                authorsArr.push(el[i]);
            }
        }
    });
    const uniqAuthorsArr = new Set(authorsArr);
    const uniqAuthors = Array.from(uniqAuthorsArr);
    for (let i = 0; i < uniqAuthors.length; i++) {
        await Author.findOrCreate({
            where: { full_name: uniqAuthors[i] },
        });
    }
    // ----------------------------

    // Create books
    for (let i = 0; i < books.length; i++) {
        if(books[i].title != '' || typeof books[i].isbn !== 'undefined') {
            let isbn = typeof books[i].isbn !== 'undefined' ? books[i].isbn : '';
            isbn = isbn.replace(/\D/g,'');
            let book = await Book.findOne({
                where: { isbn: isbn },
                attributes: ['id'],
                raw: true
            });
            if(book == null) {
                book =  await Book.create({
                    title: typeof books[i].title !== 'undefined' ? books[i].title : '',
                    isbn: typeof books[i].isbn !== 'undefined' ? books[i].isbn : '',
                    pageCount: typeof books[i].pageCount !== 'undefined' ? books[i].pageCount : '',
                    publishedDate: typeof publishedDate[i] !== 'undefined' ? publishedDate[i].$date : null,
                    thumbnailUrl: typeof books[i].thumbnailUrl !== 'undefined' ? books[i].thumbnailUrl : '',
                    shortDescription: typeof books[i].shortDescription !== 'undefined' ? books[i].shortDescription : '',
                    longDescription: typeof books[i].longDescription !== 'undefined' ? books[i].longDescription : '',
                    status: typeof books[i].status !== 'undefined' ? books[i].status : '',
                });
            }
    
            // Book categories references
            for(let item of categories[i]) {
                if(item != "") {
                    item = item.charAt(0).toUpperCase() + item.slice(1);
                    let category = await Category.findOne({
                        where: { name: item },
                        attributes: ['id'],
                        raw: true
                    });
                    if(category != null) {
                        await BookCategory.findOrCreate({
                            where: {
                                bookId: book.id, 
                                categoryId: category.id,
                            }
                        });
                    }
                }
            }
    
            // Book authors references
            for(let item of authors[i]) {
                if(item != "") {
                    let author = await Author.findOne({
                        where: { full_name: item },
                        attributes: ['id'],
                        raw: true
                    });
                    if(author != null) {
                        await BookAuthor.findOrCreate({
                            where: {
                                bookId: book.id, 
                                authorId: author.id,
                            }
                        });
                    }
                }
            }
        }
    }
}