import DataType from "sequelize";
import Model from "../../sequelize";
const Event = Model.define(
  "events",
  {
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
      type: DataType.STRING(255),
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
    display_helicopter_transfer: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    schema: "public",
    underscored: true,
    timestamps: true,
    paranoid: true,
  },
);
export default Event;
