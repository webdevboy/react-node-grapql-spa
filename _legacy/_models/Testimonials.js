/* eslint-disable camelcase */
export default (sequelize, DataType) =>
  sequelize.define('testimonials', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataType.DATE,
      allowNull: false,
    },
    testimonial: {
      type: DataType.TEXT,
      allowNull: false,
    },
    mask_name: {
      type: DataType.STRING,
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({
        Testimonials,
        SFTrip,
        Language,
        SFContact,
      }) {
        Testimonials.belongsTo(SFContact, {
          foreignKey: 'customer_contact_id',
          targetKey: 'sfid',
          as: 'Contact',
          constraints: false,
        });
        Testimonials.belongsTo(SFTrip, {
          foreignKey: 'trip_id',
          targetKey: 'sfid',
          as: 'Trip',
          constraints: false,
        });
        Testimonials.belongsTo(Language, {
          foreignKey: 'language_id',
          as: 'Language',
        });
      },
    },
  });
