'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('email_templates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      content_html: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      content_json: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      subject: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'id'
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      timestamps: true,
      underscored: true,
      schema: 'public',
    });
    const res =  await queryInterface.sequelize.query(
      `ALTER TABLE public.email_templates ADD CONSTRAINT "template_lang_unique_constraint" UNIQUE ("name", "language_id")`
    );

    return res;
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('email_templates');
  }
};
