import DataType from 'sequelize';
import Model from '../../sequelize';

const AircraftCategory = Model.define('aircrafts_categories', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  body: {
    type: DataType.JSON,
    allowNull: true,
  },
  order: {
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  featured: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  aircraft_cat_id: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  slug: {
    type: DataType.STRING(80),
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

export default AircraftCategory;
