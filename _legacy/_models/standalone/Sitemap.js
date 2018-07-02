import DataType from 'sequelize';
import Model from '../../sequelize';

const Sitemap = Model.define('sitemap', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  schema: 'public',
  timestamps: true,
  underscored: true,
});

export default Sitemap;
