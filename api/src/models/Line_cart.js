const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Line_cart",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allownull: false,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            }
        }
    )
};