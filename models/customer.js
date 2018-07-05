'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    firstName: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          args : true,
          msg : "Please input your first name"
        }
      }
    },  
    lastName: {
      type : DataTypes.STRING,
      validate : {
        notEmpty:  {
          args : true,
          msg : "Please input your last name"
        }
      }
    },
    email:{
      type : DataTypes.STRING,
      validate : {
        notEmpty:  {
          args : true,
          msg : "Please input your email"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty:  {
          args : true,
          msg : "Password can't be empty"
        }
      }
    },
    role: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    
    Customer.belongsToMany(models.Restaurant, {through: 'Reservation'})

  };

  Customer.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  }

  return Customer;
};