'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    table: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Restaurant.associate = function(models) {
    
    Restaurant.belongsToMany(models.Customer, {through: 'Reservation'})

  };
  return Restaurant;
};