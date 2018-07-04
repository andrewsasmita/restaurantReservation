'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reservation = sequelize.define('Reservation', {
    CustomerId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {});
  Reservation.associate = function(models) {
    
    Reservation.belongsTo(models.Customer)
    Reservation.belongsTo(models.Restaurant)

  };
  return Reservation;
};