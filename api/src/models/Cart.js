const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cart",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.ENUM(['Vacío', 'Pending', 'Comprado']),
                defaultValue: 'Vacío'
            }
        }
    )
};