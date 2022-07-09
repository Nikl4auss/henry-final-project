const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Brand",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image_logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
