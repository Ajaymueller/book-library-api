module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter an author',
        },
        notEmpty: {
          args: [true],
          msg: 'Author cannot be empty',
        },
      },
    },
  };

  return sequelize.define('Author', schema);
};
