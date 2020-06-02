const { Book, Reader } = require('../models');

const get404Error = (model) => {
  {
    error: `The ${model} could not be found.`;
  }
};

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

exports.getAllItems = async (res, model) => {
  const Model = await getModel(model);
  const allItems = await Model.findAll();
  res.status(200).json(allItems);
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItemCreated = await Model.create(item);
    res.status(201).json(newItemCreated);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};
