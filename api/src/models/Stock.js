const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Stock",
    { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stock_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};