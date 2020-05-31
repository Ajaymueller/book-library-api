const { Reader } = require('../models');

const getReaders = async (_, res) => {
  const readers = await Reader.findAll();
  res.status(200).json(readers);
};

const createReader = async (req, res) => {
  try {
    const newReader = req.body;
    const newReaderCreated = await Reader.create(newReader);
    return res.status(201).json(newReaderCreated);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    return res.status(400).json({ errors: errorMessages });
  }
};

const updateReaderById = async (req, res) => {
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

const getReaderById = async (req, res) => {
  const { id } = req.params;
  const reader = await Reader.findByPk(id);
  !reader
    ? res.status(404).json({ error: 'The reader could not be found.' })
    : res.status(200).json(reader);
};

const deleteReaderById = async (req, res) => {
  const { id } = req.params;
  const foundReader = await Reader.findByPk(id);
  !foundReader
    ? res.status(404).json({ error: 'The reader could not be found.' })
    : Reader.destroy({ where: { id } }).then(() => {
        res.status(204).send();
      });
};

module.exports = {
  getReaders,
  getReaderById,
  createReader,
  updateReaderById,
  deleteReaderById,
};
