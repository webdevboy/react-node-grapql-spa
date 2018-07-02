import DataType from 'sequelize';
import Model from '../sequelize';

const Device = Model.define('devices', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  manufacturer: {
    type: DataType.STRING,
    allowNull: true,
  },
  platform: {
    type: DataType.ENUM,
    values: ['iOS', 'Android', 'Browser'],
    allowNull: false,
  },
  version: {
    type: DataType.STRING,
    allowNull: true,
  },
  model: {
    type: DataType.STRING,
    allowNull: true,
  },
  uuid: {
    type: DataType.STRING,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});


export default Device;