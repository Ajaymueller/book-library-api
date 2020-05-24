/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
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
});
