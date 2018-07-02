import Sequelize from 'sequelize';
import DataType from 'sequelize';
import Model from '../../sequelize';

const Office = Model.define('offices', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING(60),
    allowNull: true,
  },

  address: {
    type: DataType.STRING,
    allowNull: false,
  },

  postal_code: {
    type: DataType.STRING(64),
    allowNull: false,
  },

  location: {
    type: DataType.STRING(60),
    allowNull: true,
  },

  country: {
    type: DataType.STRING(80),
    allowNull: false,
  },

  phone: {
    type: DataType.STRING(24),
    allowNull: true,
  },

  alt_phone: {
    type: DataType.STRING(24),
    allowNull: true,
  },

  fax: {
    type: DataType.STRING(24),
    allowNull: true,
  },
  email: {
    type: DataType.STRING(64),
    allowNull: true,
  }, 
  coordinates: {
    type: DataType.JSON,
    allowNull: true
  },
  primary: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  order:{
    type: DataType.INTEGER,
    allowNull: true
  }

}, {
  schema: 'public',
  underscored: true,
});

// Office.sync({force: true});

export default Office;