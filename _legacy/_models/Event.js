/* eslint-disable camelcase */
export default (sequelize, DataType) =>
  sequelize.define('events', {
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
    from_date: {
      type: DataType.DATE,
      allowNull: true,
    },
    until_date: {
      type: DataType.DATE,
      allowNull: true,
    },
    published: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    airport_city_sfid: {
      type: DataType.STRING(18),
      allowNull: true,
    },
    event_id: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    url: {
      type: DataType.STRING(80),
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate({
        Event,
        User,
        Language,
        SFAirportCity,
        MediaLibrary,
      }) {
        Event.belongsTo(User, {
          as: 'Author',
          foreignKey: 'user_id',
        });
        Event.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });
        // Event.belongsTo(SFAirportCity, {
        //   foreignKey: 'airport_city_sfid',
        //   sourceKey: 'sfid',
        //   targetKey: 'sfid',
        //   as: 'City',
        // });
        Event.belongsTo(MediaLibrary, {
          as: 'Image',
          foreignKey: 'media_id',
        });
      },
    },
  });

