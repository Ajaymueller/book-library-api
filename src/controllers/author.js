const { Author } = require('../models');
const { createItem } = require('./helpers');

exports.createAuthor = async (req, res) => createItem(res, 'author', req.body);

/*exports.createAuthor = async (req, res) => {
  try {
    const newItemCreated = await Author.create(item);
    res.status(201).json(newItemCreated);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};*/

exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};
