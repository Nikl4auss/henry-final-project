const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
      "Address",
      { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        addressee: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        apartment:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        country:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        state:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        city:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        postalCode:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        comment:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        primary : {
            type: DataTypes.BOOLEAN,
            default: true
        } 
      },
      { timestamps: false }
    );
  };