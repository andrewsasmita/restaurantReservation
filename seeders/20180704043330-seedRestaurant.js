'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Restaurants', [
    {
      name: 'McDonalds',
      table: 4,
      address: 'mcdpengkolan',
      phone: '123-4567890',
      createdAt: new Date (),
      updatedAt: new Date ()
    }, {
      name: 'KFC',
      table: 6,
      address: 'kfcbelakangsitu',
      phone: '012-3456789',
      createdAt: new Date (),
      updatedAt: new Date ()
    }, {
      name: 'BaksoMasPardi',
      table: 5,
      address: 'belakangsekolah',
      phone: '5678-317987',
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
