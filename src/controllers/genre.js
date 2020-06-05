const { Genre } = require('../models');

exports.createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.listGenres = async (req, res) => {
  const genres = await Genre.findAll();
  res.status(200).json(genres);
};

exports.getGenreById = async (req, res) => {
  const { genreId } = req.params;
  const genre = await Genre.findByPk(genreId);
  !genre
    ? res.status(404).json({ error: 'The genre could not be found.' })
    : res.status(200).json(genre);
};

exports.deleteGenreById = async (req, res) => {
  const { genreId } = req.params;
  const genre = await Genre.findByPk(genreId);
  !genre
    ? res.status(404).json({ error: 'The genre could not be found.' })
    : Genre.destroy({ where: { id: genreId } }).then(() =>
        res.status(204).send()
      );
};
