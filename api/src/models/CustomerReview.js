const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('CustomerReview', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}