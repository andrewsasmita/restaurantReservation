'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty:  {
          args : true,
          msg : "Please input restaurant's name"
        }
      }
    },
    table: DataTypes.INTEGER,
    address: {
      type : DataTypes.STRING,
      validate : {
        notEmpty:  {
          args : true,
          msg : "Please input restaurant's address"
        }
      }
    },
    phone: {
      type : DataTypes.STRING,
      validate : {
        notEmpty:  {
          args : true,
          msg : "Please input restaurant's phone number"
        }
      }
    },
  }, {});
  Restaurant.associate = function(models) {
    
    Restaurant.belongsToMany(models.Customer, {through: 'Reservation'})

  };
  return Restaurant;
};