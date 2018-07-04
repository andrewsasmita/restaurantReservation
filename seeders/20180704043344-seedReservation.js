'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Reservations', [
    {
      CustomerId: 1,
      RestaurantId: 1,
      time: 10,
      createdAt: new Date (),
      updatedAt: new Date ()
    }, {
      CustomerId: 1,
      RestaurantId: 2,
      time: 16,
      createdAt: new Date (),
      updatedAt: new Date ()
    }, {
      CustomerId: 2,
      RestaurantId: 1,
      time: 18,
      createdAt: new Date (),
      updatedAt: new Date ()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
