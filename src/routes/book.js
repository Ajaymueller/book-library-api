const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');

router.post('/books', bookController.createBook);

router.get('/books', bookController.getBooks);

router.get('/books/:bookId', bookController.getBookById);

router.get('readers/:readerId/books', bookController.getBookByReaderId);

router.get('/books/author', bookController.getBookByAuthor);

router.get('/books/title', bookController.getBookByTitle);

router.patch(`/books/:bookId`, bookController.updateBookByBookId);

router.delete(`/books/:bookId`, bookController.deleteBookById);

module.exports = router;
