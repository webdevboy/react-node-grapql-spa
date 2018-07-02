import Promise from 'bluebird';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // const locales = ['en', 'fr', 'de', 'it', 'es', 'pl', 'hu', 'ru'];
    // await Promise.each(locales, async (locale) => {
    //   await queryInterface.addColumn({tableName: 'aircraft_model__c', schema: 'salesforce' }, `w_url_${locale.toLowerCase()}__c`, {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   });
    // });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
