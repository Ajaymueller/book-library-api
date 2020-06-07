const express = require('express');

const router = express.Router();

const authorController = require('../controllers/author');

router.post('/author', authorController.createAuthor);

router.get('/authors', authorController.listAuthors);

router.get('/author/:authorId', authorController.getAuthorById);

router.patch('/author/:authorId', authorController.updateAuthorById);

router.delete('/author/:authorId', authorController.deleteAuthorById);

module.exports = router;
