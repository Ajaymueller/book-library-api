const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');

router.post('/book', bookController.createBook);

router.get('/books', bookController.getBooks);

router.get('/books/:bookId', bookController.getBookById);

router.patch(`/books/:bookId`, bookController.updateBookByBookId);

router.delete(`/books/:bookId`, bookController.deleteBookById);

module.exports = router;
