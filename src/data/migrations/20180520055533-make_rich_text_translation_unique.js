'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      const res =  queryInterface.sequelize.query(
        `ALTER TABLE public.rich_text_translations ADD CONSTRAINT "trans_lang_unique_constraint" UNIQUE ("message_id", "language_id")`
      );
      return res;
    } catch (e) {
      console.log ("You are having duplicated content in table rich_text_translations. Try to remove them first (or clean the table) and rerun the migration");
      console.log (e);
    }
      
  },

  down: (queryInterface, Sequelize) => {
    try {
      const res = queryInterface.sequelize.query(
        `ALTER TABLE public.rich_text_translations DROP CONSTRAINT trans_lang_unique_constraint`
      );
      return res;
  } catch (e) {
    console.log (e);
  }
  }
};
