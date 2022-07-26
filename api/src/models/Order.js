const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.ENUM(['Por pagar', 'Pagado', 'Rechazado']),
            defaultValue: 'Por pagar'
        }
    },
    { timestamps: false }
    )
}