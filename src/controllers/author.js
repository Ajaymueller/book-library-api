const { Author } = require('../models');
const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helpers');

exports.createAuthor = async (req, res) => createItem(res, 'author', req.body);

exports.listAuthors = async (req, res) => getAllItems(res, 'author');

exports.getAuthorById = async (req, res) =>
  getItemById(res, 'author', req.params.authorId);

exports.deleteAuthorById = async (req, res) =>
  deleteItem(res, 'author', req.params.authorId);
