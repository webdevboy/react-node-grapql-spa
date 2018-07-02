export default (sequelize, DataType) =>
  sequelize.define('aircraft_categories', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    aircraft_cat_id: {
      type: DataType.STRING(80),
      allowNull: false,
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
    details: {
      // to add everything related with category, price calculator multipliers or something else
      type: DataType.JSON,
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
    show_for_price_estimate: {
      type: DataType.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    featured: {
      type: DataType.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    aircraft_category_sfid: {
      type: DataType.STRING(18),
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({
        AircraftCategory,
        MediaLibrary,
        Language,
      }) {
        AircraftCategory.belongsTo(MediaLibrary, {
          as: 'Image',
          foreignKey: 'media_id',
        });
        AircraftCategory.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });
      },
    },
  });
