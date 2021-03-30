module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            unique: {
               args: true,
               msg: "Username already exists"
            }
         },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return User;
  };