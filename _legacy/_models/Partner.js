/* eslint-disable camelcase */
export default (sequelize, DataType) =>
  sequelize.define('partners', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataType.DATE,
      allowNull: false,
    },
    website: {
      type: DataType.STRING,
      allowNull: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    about: {
      type: DataType.STRING,
      allowNull: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ Partner, MediaLibrary, Language }) {
        Partner.belongsTo(MediaLibrary, {
          foreignKey: 'media_id',
          as: 'Image',
        });
        // a partner belongs to a language
        Partner.belongsTo(Language, {
          foreignKey: 'language_id',
          as: 'Language',
        });
      },
    },
  });
