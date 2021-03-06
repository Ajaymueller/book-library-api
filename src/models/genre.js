module.exports = (sequelize, DataTypes) => {
  const schema = {
    genreName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
