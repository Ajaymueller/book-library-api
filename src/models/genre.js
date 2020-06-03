module.exports = (sequelize, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter a genre',
        },
        notEmpty: {
          args: [true],
          msg: 'Genre cannot be empty',
        },
      },
    },
  };

  return sequelize.define('Genre', schema);
};
