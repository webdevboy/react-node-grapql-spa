import DataType from 'sequelize';
import Model from '../../sequelize';

const Meta = Model.define('meta', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataType.STRING,
    allowNull: true,
  },
  description: {
    type: DataType.STRING,
    allowNull: true,
  },
  keywords: {
    type: DataType.STRING,
    allowNull: true,
  },
  author: {
    type: DataType.STRING,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
  paranoid: false,
});

export default Meta;
