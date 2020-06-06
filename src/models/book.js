module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter a book title',
        },
        notEmpty: {
          args: [true],
          msg: 'Book title cannot be empty',
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      unique: true,
    },
  };

  return sequelize.define('Book', schema);
};
