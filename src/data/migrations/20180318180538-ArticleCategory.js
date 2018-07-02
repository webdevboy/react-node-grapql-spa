'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('article_categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      cat_id: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          id: 'id',
        }
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('article_categories');
  }
};
