/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book, Reader } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  let reader;

  before(async () => {
    try {
      await Reader.sequelize.sync();
      await Book.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} });
      await Book.destroy({ where: {} });
      reader = await Reader.create({
        name: 'Elizabeth Bennet',
        email: 'future_ms_darcy@gmail.com',
        password: 'password',
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /readers/:readerId/books', () => {
    xit('creates a new book in the database for a given artist', async () => {
      const response = await request(app)
        .post(`/readers/${reader.id}/books`)
        .send({
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
      expect(newBookRecord.readerId).to.equal(reader.id);
    });
    xit('returns a 404 and does not create a book if the reader does not exist', (done) => {
      request(app)
        .post('/readers/12345/books')
        .send({
          title: 'The Lord of The Rings',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '9780261103252',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The reader could not be found.');

          Book.findAll().then((books) => {
            expect(books.length).to.equal(0);
            done();
          });
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
      xit('get a book record by book id', async () => {
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

    describe('GET readers/:readerId/books', () => {
      xit('gets book records by reader id', async () => {
        const response = await response(app).get(`readers/${reader.id}/books`);

        expect(response.status).to.equal(200);
        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);
          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
      xit('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get(`readers/12345/books`);
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found');
      });
    });

    describe('GET /books', () => {
      it('gets book records by author', async () => {
        const response = await response(app).get()
      })
    }
  });
});
