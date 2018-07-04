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
   return queryInterface.bulkInsert('Customers', [
    {
      firstName: 'Udin',
      lastName: 'Pantet',
      email: 'udin@mail.com',
      password: '123',
      role: 'user',
      createdAt: new Date (),
      updatedAt: new Date ()
    }, {
      firstName: 'Emon',
      lastName: 'Kontet',
      email: 'emon@mail.com',
      password: '1234',
      role: 'user',
      createdAt: new Date (),
      updatedAt: new Date ()
    }, {
      firstName: 'Hahaha',
      lastName: 'Hihihi',
      email: 'admin@mail.com',
      password: '12345',
      role: 'admin',
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
