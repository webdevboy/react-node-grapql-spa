'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('article_gallery', {
      article_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'articles',
          key: 'id',
        }
      },
      media_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'media_library',
          key: 'id',
        }
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('article_gallery');
  }
};
