module.exports = (sequelize, DataTypes) => {
  /*const schema = {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  };*/

  const schema = {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 8,
    },
  };

  return sequelize.define('Reader', schema);
};
