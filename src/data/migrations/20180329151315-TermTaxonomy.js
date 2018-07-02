export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('term_taxonomy', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      term_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'terms',
          key: 'id',
        },
      },
      taxonomy: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'terms',
          key: 'id',
        },
      },
    }, {
      timestamps: false,
      underscored: true,
      schema: 'public',
    }),

  down: (queryInterface) =>
    queryInterface.dropTable('term_taxonomy'),
};
