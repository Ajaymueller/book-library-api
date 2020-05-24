const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');

router.post('/readers/:readerId/books', bookController.createBook);

router.get('/books', bookController.getBooks);

module.exports = router;
