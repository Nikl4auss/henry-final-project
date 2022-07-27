const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Line_order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    { timestamps: false }
    )
}