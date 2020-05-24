const { Book, Reader } = require('../models');

const createBook = (req, res) => {
  const newBook = req.body;
  const readerId = req.params;
  const reader = Reader.findByPk(readerId);

  !reader
    ? res.status(404).json({ error: 'The reader could not be found.' })
    : Book.create(newBook).then((book) => {
        book.setReader(readerId).then((linkedBook) => {
          res.status(201).json(linkedBook);
        });
      });
};

const getBooks = (req, res) => {
  Book.findAll().then((books) => {
    res.status(200).json(books);
  });
};

module.exports = {
  createBook,
  getBooks,
};
