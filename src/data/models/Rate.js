import DataType from 'sequelize';
import Model from '../sequelize';

const Rate = Model.define('currency_rates', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  rate: {
    type: DataType.DOUBLE,
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

Rate.associate = ({ Rate, Currency }) => {
  // rate belongs to a currency as from
  Rate.belongsTo(Currency, {
    foreignKey: 'currency_from_id',
    as: 'from',
  });

  // rate belongs to a currency as to
  Rate.belongsTo(Currency, {
    foreignKey: 'currency_to_id',
    as: 'to',
  });
};

export default Rate;