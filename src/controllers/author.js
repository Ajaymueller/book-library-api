const { Author } = require('../models');
const { createItem } = require('./helpers');

//exports.createAuthor = async (req, res) => createItem(res, 'author', req.body);

exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.listAuthors = async (req, res) => {
  const authors = await Author.findAll();
  res.status(200).json(authors);
};

exports.getAuthorById = async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findByPk(authorId);
  !author
    ? res.status(404).json({ error: 'The author could not be found.' })
    : res.status(200).json(author);
};

exports.deleteAuthorById = async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findByPk(authorId);
  !author
    ? res.status(404).json({ error: 'The author could not be found.' })
    : Author.destroy({ where: { id: authorId } }).then(() => {
        res.status(204).send();
      });
};
