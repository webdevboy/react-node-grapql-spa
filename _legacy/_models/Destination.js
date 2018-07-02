/* eslint-disable camelcase */
export default (sequelize, DataType) =>
  sequelize.define('destinations', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    title: {
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
    published: {
      type: DataType.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    destination_id: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    airport_city_sfid: {
      type: DataType.STRING(18),
      allowNull: false,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate({
        Destination,
        User,
        Language,
        MediaLibrary,
      }) {
        Destination.belongsTo(User, {
          as: 'Author',
          foreignKey: 'user_id',
        });
        Destination.belongsTo(Language, {
          foreignKey: 'language_id',
          as: 'Language',
        });
        Destination.belongsToMany(MediaLibrary, {
          as: 'Gallery',
          foreignKey: 'destination_id',
          through: 'destination_gallery',
        });
      },
    },
  });
