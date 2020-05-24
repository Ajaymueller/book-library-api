const { Book } = require('../models');

const createBook = (req, res) => {
  const newBook = req.body;

  Book.create(newBook).then((newBookCreated) =>
    res.status(201).json(newBookCreated)
  );
};

module.exports = {
  createBook,
};
