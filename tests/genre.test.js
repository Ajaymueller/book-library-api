/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');

describe.only('/genres', () => {
  before(async () => {
    await Genre.sequelize.sync();
  });

  describe('POST /genre', () => {
    it('creates a new genre', async () => {
      const response = await request(app).post(`/genre`).send({
        genreName: 'Fantasy',
      });

      const newGenreRecord = await Genre.findByPk(response.body.id, {
        raw: true,
      });
      expect(response.status).to.equal(201);
      expect(response.body.genreName).to.equal('Fantasy');
      expect(newGenreRecord.genreName).to.equal('Fantasy');
    });

    it('errors if the genre is missing', async () => {
      const response = await request(app).post('/genre').send({});

      const newGenreRecord = await Genre.findByPk(response.body.id, {
        raw: true,
      });
      expect(response.status).to.equal(400);
      expect(response.body.errors.length).to.equal(1);
      expect(newGenreRecord).to.equal(null);
    });

    it('errors if the genre is empty', async () => {
      const response = await request(app).post('/genre').send({
        genreName: '',
      });
      const newGenreRecord = await Genre.findByPk(response.body.id, {
        raw: true,
      });
      expect(response.status).to.equal(400);
      expect(response.body.errors.length).to.equal(1);
      expect(newGenreRecord).to.equal(null);
    });
  });

  describe('with genres in the database', () => {
    let genres;

    beforeEach(async () => {
      await Genre.destroy({ where: {} });

      genres = await Promise.all([
        Genre.create({
          genreName: 'Fantasy',
        }),
        Genre.create({
          genreName: 'Thriller',
        }),
        Genre.create({
          genreName: 'Non-fiction',
        }),
      ]);
    });

    describe('GET /genres', () => {
      it('gets all genres', async () => {
        const response = await request(app).get('/genres');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((genre) => {
          const expected = genres.find((g) => g.id === genre.id);

          expect(genre.genreName).to.equal(expected.genreName);
        });
      });
    });

    describe('GET /genre/:genreId', () => {
      it('gets genre by Id', async () => {
        const genre = genres[0];
        const response = await request(app).get(`/genre/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genreName).to.equal(genre.genreName);
      });
      it('returns a 404 if the genre cannot be found', async () => {
        const response = await request(app).get('/genre/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });

    describe('UPDATE /genre/:genreId', () => {
      it('updates a genre by id', async () => {
        const genre = genres[0];
        const response = await request(app).patch(`/genre/${genre.id}`).send({
          genreName: 'Horror',
        });

        const updatedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(200);
        expect(updatedGenre.genreName).to.equal('Horror');
      });
      it('returns a 404 if the genre could not be found', async () => {
        const response = await request(app).patch('/genre/12345').send({
          genreName: 'randonGenre',
        });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });

    describe('DELETE /genre/:genreId', () => {
      it('deletes a genre by id', async () => {
        const genre = genres[0];
        const response = await request(app).delete(`/genre/${genre.id}`);
        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedGenre).to.equal(null);
      });
      it('returns a 404 if the genre cannot be found', async () => {
        const response = await request(app).delete(`/genre/12345`);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });
  });
});
