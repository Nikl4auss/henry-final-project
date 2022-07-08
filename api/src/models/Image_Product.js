const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Image_Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
