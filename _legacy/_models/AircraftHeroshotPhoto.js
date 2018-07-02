export default (sequelize, DataType) =>
  sequelize.define('aircraft_heroshotphoto', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    heroshotphoto_id: {
      type: DataType.STRING(50),
      allowNull: false,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: true,
    paranoid: true,
  });