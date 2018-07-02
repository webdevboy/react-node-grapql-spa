'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('articles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      article_id: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      body: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      publish_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      source: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      state: {
        type: Sequelize.ENUM('draft', 'published', 'pending'),
        allowNull: false,
        defaultValue: 'draft',
      },
      featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'article_categories',
          key: 'id',
        }
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
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
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          id: 'id',
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    }, {
      paranoid: true,
      timestamps: true,
      underscored: true,
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('articles');
  }
};
