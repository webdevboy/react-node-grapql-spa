'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.removeColumn('empty_legs', 'aircraft_id');
    await queryInterface.addColumn('empty_legs', 'aircraft_sfid', {
      type: Sequelize.STRING(18),
      allowNull: false,
      references: {
        model: {
          tableName: 'aircraft_model__c', 
          schema: 'salesforce'
        },
        key: 'sfid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });

    await queryInterface.removeColumn('empty_legs', 'from_airport_sfid');
    await queryInterface.addColumn('empty_legs', 'from_airport_sfid', {
      type: Sequelize.STRING(18),
      allowNull: false,
      references: {
        model: {
          tableName: 'airport__c', 
          schema: 'salesforce'
        },
        key: 'sfid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });

    await queryInterface.removeColumn('empty_legs', 'to_airport_sfid');
    await queryInterface.addColumn('empty_legs', 'to_airport_sfid', {
      type: Sequelize.STRING(18),
      allowNull: false,
      references: {
        model: {
          tableName: 'airport__c', 
          schema: 'salesforce'
        },
        key: 'sfid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });

      // queryInterface.addColumn ("empty_legs", "available_seats", {
      //   type: Sequelize.INTEGER,
      //   allowNull: true
      // }),

    await queryInterface.removeColumn('empty_legs', 'details');
    await queryInterface.addColumn('empty_legs', 'details', {
      type: Sequelize.JSONB,
      allowNull: false,
    });

    await queryInterface.removeColumn('empty_legs', 'currency_id');
    await queryInterface.addColumn('empty_legs', 'currency_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'currencies',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    // console.log(' ADD COLUMN CURRENCY ')
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // queryInterface.removeColumn('empty_legs', 'from_airport_sfid');
    // queryInterface.addColumn("empty_legs", "from_airport_sfid", {
    //   type: Sequelize.STRING(18),
    //   allowNull: false,
    // });
    // queryInterface.removeColumn('empty_legs', 'to_airport_sfid');
    // queryInterface.addColumn("empty_legs", "to_airport_sfid", {
    //   type: Sequelize.STRING(18),
    //   allowNull: false,
    // });
    // queryInterface.removeColumn('empty_legs', 'aircraft_sfid');
    // queryInterface.addColumn('empty_legs', 'aircraft_id', {
    //   type: Sequelize.UUID,
    //     references: {
    //       model: 'aircrafts',
    //       key: 'id'
    //     }
    // });
    // queryInterface.removeColumn ("empty_legs", "available_seats"),

    // queryInterface.removeColumn('empty_legs', 'details');
    // queryInterface.addColumn("empty_legs", "details", {
    //   type: Sequelize.JSON,
    //   allowNull: false,
    // });

    // queryInterface.removeColumn('empty_legs', 'currency_id');
    // queryInterface.addColumn("empty_legs", "currency_id", {
    //   type: Sequelize.UUID,
    //   allowNull: true,
    // });
  },
};