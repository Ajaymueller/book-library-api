const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helpers');

const { Book, Reader, Genre, Author } = require('../models');

exports.createGenre = async (req, res) => createItem(res, 'genre', req.body);

/*exports.createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    console.log('testGenre', genre);
    res.status(201).json(genre);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};*/

exports.listGenres = async (req, res) => getAllItems(res, 'genre');

exports.getGenreById = async (req, res) =>
  getItemById(res, 'genre', req.params.genreId);

exports.updateGenreById = async (req, res) =>
  updateItem(res, 'genre', req.body, req.params.genreId);

exports.deleteGenreById = async (req, res) =>
  deleteItem(res, 'genre', req.params.genreId);
