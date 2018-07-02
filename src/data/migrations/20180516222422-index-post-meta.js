'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addIndex('posts',{
      fields: ['meta'],
      using: 'gin',
      operator: 'jsonb_path_ops',
      name: 'meta_index',
      type: 'FULLTEXT'
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('posts','meta_index');
  }
};
