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

const removePassword = (obj) => {
  if (obj.hasOwnProperty('password')) {
    delete obj.password;
  }
  return obj;
};

exports.getAllItems = async (res, model) => {
  const Model = await getModel(model);
  const items = await Model.findAll();
  const itemsWithoutPassword = await items.map((item) =>
    removePassword(item.dataValues)
  );
  res.status(200).json(itemsWithoutPassword);
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItemCreated = await Model.create(item);
    const itemsWithoutPassword = await removePassword(
      newItemCreated.dataValues
    );
    res.status(201).json(itemsWithoutPassword);
  } catch (error) {
    const errorMessages = await error.errors.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.getItemById = async (res, model, id) => {
  const Model = getModel(model);

  const item = await Model.findByPk(id);
  !item
    ? res.status(404).json({ error: `The ${model} could not be found.` })
    : res.status(200).json(item);
};

exports.updateItem = async (res, model, item, id) => {
  const Model = getModel(model);

  return Model.update(item, { where: { id } }).then(([recordsUpdated]) => {
    if (!recordsUpdated) {
      res.status(404).json({ error: `The ${model} could not be found.` });
    } else {
      getModel(model)
        .findByPk(id)
        .then((updatedItem) => {
          const itemWithoutPassword = removePassword(updatedItem.dataValues);
          res.status(200).json(itemWithoutPassword);
        });
    }
  });
};

exports.deleteItem = async (res, model, id) => {
  const Model = getModel(model);

  const item = await Model.findByPk(id);
  !item
    ? res.status(404).json({ error: `The ${model} could not be found.` })
    : Model.destroy({ where: { id } }).then(() => {
        res.status(204).send();
      });
};
