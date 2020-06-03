const express = require('express');

const router = express.Router();

const authorController = require('../controllers/author');

router.post('/author', authorController.createAuthor);

module.exports = router;
