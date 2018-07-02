'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   await queryInterface.removeConstraint('empty_legs', 'empty_legs_aircraft_sfid_fkey');
   await queryInterface.addConstraint('empty_legs', ['aircraft_sfid'], {
    type: 'foreign key',
    name: 'empty_legs_aircraft_sfid_fkey',
    references: { //Required field
      table: {
        tableName: 'aircraft_model__c',
        schema: 'salesforce'
      },
      field: 'sfid'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });

    await queryInterface.removeConstraint('empty_legs', 'empty_legs_from_airport_sfid_fkey'); 
    await queryInterface.addConstraint('empty_legs', ['from_airport_sfid'], {
      type: 'foreign key',
      name: 'empty_legs_from_airport_sfid_fkey',
      references: { //Required field
        table: {
          tableName: 'airport__c',
          schema: 'salesforce'
        },
        field: 'sfid'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.removeConstraint('empty_legs', 'empty_legs_to_airport_sfid_fkey'); 
    await queryInterface.addConstraint('empty_legs', ['to_airport_sfid'], {
      type: 'foreign key',
      name: 'empty_legs_to_airport_sfid_fkey',
      references: { //Required field
        table: {
          tableName: 'airport__c',
          schema: 'salesforce'
        },
        field: 'sfid'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.removeConstraint('empty_legs', 'empty_legs_opportunity_sfid_fkey'); 
    await queryInterface.addConstraint('empty_legs', ['opportunity_sfid'], {
      type: 'foreign key',
      name: 'empty_legs_opportunity_sfid_fkey',
      references: { //Required field
        table: {
          tableName: 'opportunity',
          schema: 'salesforce'
        },
        field: 'sfid'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.removeColumn('empty_legs', 'currency_id');
    await queryInterface.addColumn('empty_legs', 'currency_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'currencies',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
