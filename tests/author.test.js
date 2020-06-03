/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe.only('/authors', () => {
  before(async () => Author.sequelize.sync());

  describe('POST /author', () => {
    it('creates an author for a given book', async () => {
      const response = await request(app).post('/author').send({
        author: 'JRR Tolkien',
      });
      const newAuthorRecord = await Author.findByPk(response.body.id, {
        raw: true,
      });
      expect(response.status).to.equal(201);
      expect(response.body.author).to.equal('JRR Tolkien');
      expect(newAuthorRecord.author).to.equal('JRR Tolkien');
    });
    it('errors if author is missing', async () => {
      const response = await request(app).post('/author').send({});
      const newAuthorRecord = await Author.findByPk(response.body.id, {
        raw: true,
      });

      expect(response.status).to.equal(400);
      expect(response.body.errors.length).to.equal(1);
      expect(newAuthorRecord).to.equal(null);
    });
    it('errors if author is empty', async () => {
      const response = await request(app).post('/author').send({
        author: '',
      });
      const newAuthorRecord = await Author.findByPk(response.body.id, {
        raw: true,
      });

      expect(response.status).to.equal(400);
      expect(response.body.errors.length).to.equal(1);
      expect(newAuthorRecord).to.equal(null);
    });
  });
});
