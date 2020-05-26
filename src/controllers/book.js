const { Book, Reader } = require('../models');

const createBook = (req, res) => {
  const newBook = req.body;

  Book.create(newBook).then((newBookCreated) => {
    res.status(201).json(newBookCreated);
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

const getBookByAuthor = (req, res) => {
  const { author } = req.query;
  Book.findAll({ where: { author: author } }).then((books) => {
    const bookData = books.filter((book) => book.author === author);
    console.log('testbd', author);
    !bookData
      ? res.status(404).json({ error: 'The book could not be found' })
      : res.status(200).json(bookData);
  });
};

const getBookByTitle = async (req, res) => {
  const { title } = req.query;
  //const books = await Book.findAll({ where: { title: title } });
  //const bookData = await books.filter((book) => book.title === title);

  Book.findAll({ where: { title: title } }).then((books) => {
    const bookData = books.filter((book) => book.title === title);

    bookData < 1
      ? res.status(404).json({ error: 'The book could not be found' })
      : res.status(200).json(bookData);
  });
};

const updateBookByBookId = async (req, res) => {
  const { bookId } = req.params;
  Book.findByPk(bookId).then((book) => {
    !book
      ? res.status(404).json({ error: 'The book could not be found.' })
      : Book.update(req.body, { where: { id: bookId } }).then((updatedBook) => {
          res.status(200).json(updatedBook);
        });
  });
};

const deleteBookById = async (req, res) => {
  const { bookId } = req.params;

  Book.findByPk(bookId).then((foundBook) => {
    !foundBook
      ? res.status(404).json({ error: 'The book could not be found.' })
      : Book.destroy({ where: { id: bookId } }).then(() => {
          res.status(204).send();
        });
  });
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getBookByReaderId,
  getBookByAuthor,
  getBookByTitle,
  updateBookByBookId,
  deleteBookById,
};
