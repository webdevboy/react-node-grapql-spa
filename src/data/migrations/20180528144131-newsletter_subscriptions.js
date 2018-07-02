export default {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('newsletter_subscriptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
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
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
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
    queryInterface.dropTable('newsletter_subscriptions'),
};
