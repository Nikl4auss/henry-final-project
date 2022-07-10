const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('MainColor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
    )
}