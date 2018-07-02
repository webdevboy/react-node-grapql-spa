/* eslint-disable camelcase */
export default (sequelize, DataType) =>
  sequelize.define('aircraft_manufacturers', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    aircraft_man_id: {
      type: DataType.STRING(80),
      allowNull: true,
    },
    name: {
      type: DataType.STRING(80),
      allowNull: false,
    },
    slug: {
      type: DataType.STRING(80),
      allowNull: false,
    },
    summary: {
      type: DataType.STRING(255),
      allowNull: true,
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
    aircraft_manufacturer_sfid: {
      type: DataType.STRING(18),
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({
        AircraftManufacturer,
        Language,
        MediaLibrary,
      }) {
        AircraftManufacturer.belongsTo(MediaLibrary, {
          as: 'Image',
          foreignKey: 'media_id',
        });
        AircraftManufacturer.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });
      },
    },
  });
