'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.createTable('locales', {
    //   id: {
    //     type: Sequelize.UUID,
    //     defaultValue: Sequelize.UUIDV4,
    //     primaryKey: true,
    //   },
    //   locale: {
    //     type: Sequelize.STRING(2),
    //     allowNull: false,
    //     unique: {
    //       args: true,
    //       msg: 'Duplicated locales are now allowed!',
    //     },
    //   },
    //   language: {
    //     type: Sequelize.STRING(40),
    //     allowNull: true,
    //   },
    //   native: {
    //     type: Sequelize.STRING(60),
    //     allowNull: true,
    //   },
    //   rtl: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: true,
    //   },
    // }, {
    //   schema: 'public',
    // });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('locales');
  }
};
