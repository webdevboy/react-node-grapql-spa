'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      city_sfid: {
        type: Sequelize.STRING(18),
        allowNull: true,
      },
      country_sfid: {
        type: Sequelize.STRING(18),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(24),
        allowNull: true,
      },
      alt_phone: {
        type: Sequelize.STRING(24),
        allowNull: true,
      },
      fax: {
        type: Sequelize.STRING(24),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }, 
      coordinates: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      primary: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          id: 'id',
        },
      },
    }, {
      timestamps: false,
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offices');
  }
};
