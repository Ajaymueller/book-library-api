const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helpers');

exports.createGenre = async (req, res) => createItem(res, 'genre', req.body);

exports.listGenres = async (req, res) => getAllItems(res, 'genre');

exports.getGenreById = async (req, res) =>
  getItemById(res, 'genre', req.params.genreId);

exports.updateGenreById = async (req, res) =>
  updateItem(res, 'genre', req.body, req.params.genreId);

exports.deleteGenreById = async (req, res) =>
  deleteItem(res, 'genre', req.params.genreId);
