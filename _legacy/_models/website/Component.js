import DataType from 'sequelize';
import Model from '../../sequelize';

const Component = Model.define('components', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING,
    allowNull: false,
  },

  category: {
    type: DataType.STRING,
    allowNull: true,
  },

  data_type: {
    type: DataType.STRING,
    allowNull: true,
  },

  dependencies: {
    type: DataType.STRING,
    allowNull: true,
  },

  body: {
    type: DataType.JSON,
    allowNull: true
  },

},{
  underscored: true,
});

export default Component;