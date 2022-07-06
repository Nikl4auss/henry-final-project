const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validator: {
                len: [3, 30],
                is: /^[a-zA-Z0-9]+$/,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validator: {
                is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

            }

        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}