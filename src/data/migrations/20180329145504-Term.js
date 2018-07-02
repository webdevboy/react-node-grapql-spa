export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('terms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      meta: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'id',
        },
      },
    }, {
      timestamps: false,
      underscored: true,
      schema: 'public',
    }),

  down: (queryInterface) =>
    queryInterface.dropTable('terms'),
};
