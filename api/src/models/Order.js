const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allownull: false,
                primaryKey: true,
            },
            totalPrice: {
                type: DataTypes.INTEGER,
                allownull: false
            },
            status: {
                type: DataTypes.ENUM(['Pendiente', 'Despachado', 'Entregado']),
                defaultValue: 'Pendiente'
            },
            payment_status: {
                type: DataTypes.ENUM(['approved', 'pending','failure', 'paymentLinkGenerated']),
                defaultValue: 'paymentLinkGenerated'

            }
        }
    )
};
