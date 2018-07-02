import DataType from 'sequelize';
import Model from '../sequelize';

const Rediretion = Model.define('redirections', {
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
    type: DataType.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataType.STRING(255),
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
  created_at: DataType.DATE,
  updated_at: DataType.DATE,
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

export default Rediretion;