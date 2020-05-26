/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database for a given artist', async () => {
        const response = await request(app).post(`/books`).send({
          title: 'The Lord of The Rings',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '9780261103252',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('The Lord of The Rings');
        expect(newBookRecord.title).to.equal('The Lord of The Rings');
        expect(newBookRecord.author).to.equal('JRR Tolkien');
        expect(newBookRecord.genre).to.equal('Fantasy');
        expect(newBookRecord.ISBN).to.equal('9780261103252');
      });
    });
  });

  describe('with records in the database', () => {
    let books;

    beforeEach(async () => {
      await Book.destroy({ where: {} });

      books = await Promise.all([
        Book.create({
          title: 'The Lord of The Rings',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '9780261103252',
        }),
        Book.create({
          title: 'The Hobbit',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '9780788789823',
        }),
      ]);
    });
    describe('GET /books', () => {
      xit('gets all book records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe('GET books/:bookId', () => {
      xit('get books record by book id', async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });
      xit('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found');
      });
    });

    describe('UPDATE /books/:bookId', () => {
      xit('updates a book record by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ author: 'Christopher Tolkien' });
        const updatedBookRecord = await Book.findByPk(book.id, { raw: true });
        expect(response.status).to.equal(200);
        expect(updatedBookRecord.author).to.equal('Christopher Tolkien');
      });
      xit('returns a 404 if the book could not be found', async () => {
        const response = await request(app)
          .patch(`/books/12345`)
          .send({ author: 'RandomName' });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
    describe('DELETE /books/:bookId', () => {
      xit('deletes book record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });
      xit('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete(`/books/12345`);
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});
