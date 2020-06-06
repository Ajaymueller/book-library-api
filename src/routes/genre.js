const express = require('express');

const router = express.Router();

const genreController = require('../controllers/genre');

router.post('/genre', genreController.createGenre);

router.get('/genres', genreController.listGenres);

router.get('/genre/:genreId', genreController.getGenreById);

router.patch('/genre/:genreId', genreController.updateGenreById);

router.delete('/genre/:genreId', genreController.deleteGenreById);

module.exports = router;
