'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    
    Customer.belongsToMany(models.Restaurant, {through: 'Reservation'})

  };
  return Customer;
};