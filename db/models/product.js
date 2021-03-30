module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};
