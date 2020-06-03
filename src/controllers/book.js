const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helpers');

exports.createBook = async (req, res) => createItem(res, 'book', req.body);

exports.getBooks = (req, res) => getAllItems(res, 'book');

exports.getBookById = async (req, res) =>
  getItemById(res, 'book', req.params.bookId);

exports.updateBookByBookId = async (req, res) =>
  updateItem(res, 'book', req.body, req.params.bookId);

exports.deleteBookById = async (req, res) =>
  deleteItem(res, 'book', req.params.bookId);
