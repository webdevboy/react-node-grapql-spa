export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      body: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      meta: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      publish_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      state: {
        type: Sequelize.ENUM('draft', 'published', 'pending', 'protected'),
        defaultValue: 'draft',
        allowNull: false,
      },
      type: {
        // post, page, event, destination, partner, office, review, team-member
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'id',
        },
      },
      media_id: { // default image
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'media_library',
          key: 'id',
        },
      },
      user_id: { // author
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          id: 'id',
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    }, {
      paranoid: true,
      timestamps: true,
      underscored: true,
      schema: 'public',
    }),

  down: (queryInterface) =>
    queryInterface.dropTable('posts'),
};
