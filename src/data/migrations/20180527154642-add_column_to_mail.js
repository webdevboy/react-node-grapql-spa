'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('email_templates', 'email_to', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    });
    await queryInterface.addColumn('email_templates', 'email_id', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('email_templates', 'email_to');
    await queryInterface.removeColumn('email_templates', 'email_id');

  }
};
