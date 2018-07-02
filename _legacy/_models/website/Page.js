import DataType from 'sequelize';
import Model from '../../sequelize';

const Page = Model.define('pages', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  slug: {
    type: DataType.STRING,
    allowNull: false,
    unique: true
  },

  path: {
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  },

  title: {
    type: DataType.STRING,
    allowNull: false,
  },

  template: {
    type: DataType.STRING,
    allowNull: false,
  },

  body: {
    type: DataType.JSON,
    allowNull: true
  },

  isHome: {
    type: DataType.BOOLEAN,
    default: false,
    allowNull: false,
  },

  query: {
    type: DataType.TEXT,
    allowNull: true,
  },

  external_scripts: {
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  },

  custom_script: {
    type: DataType.TEXT,
    allowNull: true,
  },

  state: {
    type: DataType.BOOLEAN,
    allowNull: true
  },

}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
  paranoid: true
});

export default Page;