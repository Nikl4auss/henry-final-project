const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cart",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            status: {
                type: DataTypes.ENUM(['Vacio', 'Pending']),
                defaultValue: 'Vacio'
            }
        }
    )
};