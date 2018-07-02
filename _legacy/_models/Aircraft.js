/* eslint-disable camelcase */
export default (sequelize, DataType) => sequelize.define('aircrafts', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  model_name: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  slug: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  body: {
    type: DataType.JSON,
    allowNull: true,
  },
  details: { // to add everything related with model, speed, height, width, seats ...
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
  aircraft_sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
}, {
  paranoid: true,
  schema: 'public',
  underscored: true,
  timestamps: true,
  classMethods: {
    associate({
      Aircraft,
      AircraftCategory,
      AircraftManufacturer,
      MediaLibrary,
      Language,
      User,
    }) {
      Aircraft.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'Author',
      });
      Aircraft.belongsTo(Language, {
        foreignKey: 'language_id',
        as: 'Translation',
      });

      Aircraft.belongsTo(AircraftCategory, {
        foreignKey: 'category_id',
        as: 'Category',
      });
      Aircraft.belongsTo(AircraftManufacturer, {
        foreignKey: 'manufacturer_id',
        as: 'Manufacturer',
      });
      // aircraft has a default media image
      Aircraft.belongsTo(MediaLibrary, {
        as: 'Image',
        foreignKey: 'media_id',
      });
      // aircraft can have multiple images
      Aircraft.belongsToMany(MediaLibrary, {
        as: 'Gallery',
        foreignKey: 'media_id',
        through: 'aircraft_gallery',
        timestamps: false,
      });
    },
  },
});

