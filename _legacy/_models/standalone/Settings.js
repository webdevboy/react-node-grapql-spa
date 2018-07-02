import DataType from 'sequelize';
import Model from '../../sequelize';

const Settings = Model.define('settings', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  option: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },

  value: {
    type: DataType.STRING,
    allowNull: true,
  },

  description: {
    type: DataType.STRING,
    allowNull: true,
  }

}, {
  schema: 'public',
  timestamps: false,
  underscored: true
  
});

export default Settings;
