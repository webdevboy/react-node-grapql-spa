import DataType from 'sequelize';
import Model from '../../sequelize';

const Template = Model.define('templates', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING,
    allowNull: false,
  },

  body: {
    type: DataType.JSON,
    allowNull: true
  },

}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
  paranoid: true
});

export default Template;