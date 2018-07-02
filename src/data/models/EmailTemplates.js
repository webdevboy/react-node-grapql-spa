import DataType from 'sequelize';
import Model from '../sequelize';

const EmailTemplates = Model.define('email_templates', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  content_html: {
    type: DataType.TEXT,
    allowNull: true,
  },
  content_json: {
    type: DataType.JSONB,
    allowNull: true,
  },
  subject: {
    type: DataType.TEXT,
    allowNull: true,
  },
  email_to: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  },
  email_id: {
    type: DataType.STRING,
    allowNull: true,
  }
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

EmailTemplates.associate = ({ EmailTemplates, Language }) => {
  // a string translation belongs to a language
  EmailTemplates.belongsTo(Language, {
    foreignKey: 'language_id',
    as: 'Language',
  });
};

export default EmailTemplates;