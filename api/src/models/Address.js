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
        name_street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city:{
          type: DataTypes.STRING,
          allowNull: true,
        }
        ,
        primary : {
            type: DataTypes.BOOLEAN,
            default: true
        } 
      },
      { timestamps: false }
    );
  };