const express = require('express');

const router = express.Router();

const genreController = require('../controllers/genre');

router.post('/genre', genreController.createGenre);

router.get('/genres', genreController.listGenres);

router.get('/genre/:genreId', genreController.getGenreById);

module.exports = router;
