const { Reader } = require('../models');
const { getAllItems, createItem } = require('./helpers');

const getReaders = (req, res) => getAllItems(res, 'reader');

const createReader = async (req, res) => createItem(res, 'reader', req.body);

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
