'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('article_posts_tags', {
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'article_tags',
          key: 'id',
        }
      },
      article_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id',
        }
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('article_posts_tags');
  }
};
