'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post_terms_taxonomy', {
      post_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      term_taxonomy_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'term_taxonomy',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    }, {
      schema: 'public',
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('post_terms_taxonomy');
  }
};
