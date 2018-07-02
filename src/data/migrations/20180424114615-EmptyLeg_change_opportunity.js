'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('empty_legs', 'opportunity_sfid');
    await queryInterface.addColumn('empty_legs', 'opportunity_sfid', {
      type: Sequelize.STRING(18),
      allowNull: true,
      references: {
        model: {
          tableName: 'opportunity',
          schema: 'salesforce'
        },
        key: 'sfid'
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    // queryInterface.removeColumn('empty_legs', 'opportunity_sfid');
    // queryInterface.addColumn("empty_legs", "opportunity_sfid", {
    //   type: Sequelize.STRING(18),
    //   allowNull: false,
    // });
  }
};