const { Reader } = require('../models');

const getReaders = (_, res) => {
  Reader.findAll().then((readers) => {
    res.status(200).json(readers);
  });
};

const createReader = (req, res) => {
  const newReader = req.body;

  Reader.create(newReader).then((newReaderCreated) =>
    res.status(201).json(newReaderCreated)
  );
};

const updateReader = (req, res) => {
  const { id } = req.params;
  const newDetails = req.body;

  Reader.update(newDetails, { where: { id } }).then(([recordsUpdated]) => {
    !recordsUpdated
      ? res.status(404).json({ error: 'The reader could not be found.' })
      : Reader.findByPk(id).then((updatedReader) => {
          res.status(200).json(updatedReader);
        });
  });
};

const getReaderById = (req, res) => {
  const { id } = req.params;
  Reader.findByPk(id).then((reader) => {
    !reader
      ? res.status(404).json({ error: 'The reader could not be found.' })
      : res.status(200).json(reader);
  });
};

const deleteReader = (req, res) => {
  const { id } = req.params;

  Reader.findByPk(id).then((foundReader) => {
    !foundReader
      ? res.status(404).json({ error: 'The reader could not be found.' })
      : Reader.destroy({ where: { id } }).then(() => {
          res.status(204).send();
        });
  });
};

module.exports = {
  getReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader,
};
