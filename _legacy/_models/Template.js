/* eslint-disable camelcase */
export default (sequelize, DataType) =>
  sequelize.define('templates', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    body: {
      type: DataType.JSON,
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: true,
    paranoid: true,
  });