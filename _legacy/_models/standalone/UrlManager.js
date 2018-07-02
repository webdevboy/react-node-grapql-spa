import DataType from 'sequelize';
import Model from '../../sequelize';

const UrlManager = Model.define('url_manager', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  link: {
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: false,
  },
  redirect: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: true,
  },
  http_code: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 301,
    validate: {
      min: 301,
      max: 302,
    },
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

export default UrlManager;