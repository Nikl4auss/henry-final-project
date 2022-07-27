const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Line_order",
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