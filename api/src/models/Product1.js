const { DataType, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Product",{
        Id_product: {
            prymeryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image:{

        },
        price: {

        },
        category: {

        }
    },
    {
        timestamps: false
    })
}