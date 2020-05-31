const { Book, Reader } = require('../models');

const createBook = async (req, res) => {
  try {
    const newBook = req.body;
    const newBookCreated = await Book.create(newBook);
    res.status(201).json(newBookCreated);
  } catch (error) {
    const errorMessages = error.errors.map((e) => e.message);
    return res.status(400).json({ errors: errorMessages });
  }
};

const getBooks = async (req, res) => {
  const books = await Book.findAll();
  !books
    ? res.status(404).json({ error: 'The book could not be found' })
    : res.status(200).json(books);
};

const getBookById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByPk(bookId);
  !book
    ? res.status(404).json({ error: 'The book could not be found' })
    : res.status(200).json(book);
};

const updateBookByBookId = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByPk(bookId);
  !book
    ? res.status(404).json({ error: 'The book could not be found.' })
    : Book.update(req.body, { where: { id: bookId } }).then((updatedBook) => {
        res.status(200).json(updatedBook);
      });
};

const deleteBookById = async (req, res) => {
  const { bookId } = req.params;
  const foundBook = await Book.findByPk(bookId);
  !foundBook
    ? res.status(404).json({ error: 'The book could not be found.' })
    : Book.destroy({ where: { id: bookId } }).then(() => {
        res.status(204).send();
      });
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookByBookId,
  deleteBookById,
};
