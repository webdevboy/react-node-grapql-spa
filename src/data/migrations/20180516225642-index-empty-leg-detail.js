'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addIndex('empty_legs',{
      fields: ['details'],
      using: 'gin',
      operator: 'jsonb_path_ops',
      name: 'details_index',
      type: 'FULLTEXT'
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('empty_legs','details_index');
  }
};

