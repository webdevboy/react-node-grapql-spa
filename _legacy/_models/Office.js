export default (sequelize, DataTypes) =>
  sequelize.define('offices', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city_sfid: {
      type: DataTypes.STRING(18),
      allowNull: true,
    },
    country_sfid: {
      type: DataTypes.STRING(18),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(24),
      allowNull: true,
    },
    alt_phone: {
      type: DataTypes.STRING(24),
      allowNull: true,
    },
    fax: {
      type: DataTypes.STRING(24),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    coordinates: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ Office, User }) {
        Office.belongsTo(User, {
          foreignKey: 'user_id',
          as: 'Author',
        });
      },
    },
  });
