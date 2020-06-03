const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helpers');

exports.getReaders = (req, res) => getAllItems(res, 'reader');

exports.createReader = async (req, res) => createItem(res, 'reader', req.body);

exports.updateReaderById = async (req, res) =>
  updateItem(res, 'reader', req.body, req.params.id);

exports.getReaderById = async (req, res) =>
  getItemById(res, 'reader', req.params.id);

exports.deleteReaderById = async (req, res) =>
  deleteItem(res, 'reader', req.params.id);
