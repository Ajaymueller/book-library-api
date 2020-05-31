module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          agrs: [true],
          msg: 'Email must be in correct format',
        },
        notNull: {
          args: [true],
          mag: 'Please enter an email',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Name cannot be empty',
        },
        notNull: {
          args: [true],
          msg: 'Please enter a name',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter a password',
        },
        lessThan8Characters(value) {
          if (value.length < 8)
            throw new Error('Password must be longer than 8 characters');
        },
      },
    },
  };

  return sequelize.define('Reader', schema);
};
