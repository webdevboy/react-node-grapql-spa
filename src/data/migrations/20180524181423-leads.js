export default {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('leads', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      contact_sfid: {
        type: Sequelize.STRING(18),
        allowNull: true,
        references: {
          model: {
            schema: 'salesforce',
            tableName: 'contact',
          },
          key: 'sfid',
        },
      },
      lead_sfid: {
        type: Sequelize.STRING(18),
        allowNull: true,
      },
      raw_data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      request_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(['SUCCESS', 'ERROR']),
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      paranoid: false,
      timestamps: true,
      underscored: true,
      schema: 'public',
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('leads'),
};
