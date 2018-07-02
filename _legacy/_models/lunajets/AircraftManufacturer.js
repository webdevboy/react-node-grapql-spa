import DataType from 'sequelize';
import Model from '../../sequelize';

const AircraftManufacturer = Model.define('aircrafts_manufacturer', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
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
  aircraft_man_id: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  slug: {
    type: DataType.STRING(80),
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

export default AircraftManufacturer;
