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
    !books
      ? res.status(404).json({ error: 'The book could not be found' })
      : res.status(200).json(books);
  });
};

const getBookById = (req, res) => {
  const { bookId } = req.params;

  Book.findByPk(bookId).then((book) => {
    !book
      ? res.status(404).json({ error: 'The book could not be found' })
      : res.status(200).json(book);
  });
};

const getBookByReaderId = (req, res) => {
  const { readerId } = req.params;

  Reader.findByPk(readerId).then((reader) => {
    !reader
      ? res.status(404).json({ error: 'The book could not be found' })
      : Book.findAll({ where: { readerId: readerId } }).then((book) =>
          res.status(200).json(book)
        );
  });
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getBookByReaderId,
};
