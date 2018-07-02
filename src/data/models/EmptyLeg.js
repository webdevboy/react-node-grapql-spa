import DataType from 'sequelize';
import Model from '../sequelize';

const EmptyLeg = Model.define('empty_legs', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from_date: {
    type: DataType.DATE,
    allowNull: false,
  },
  until_date: {
    type: DataType.DATE,
    allowNull: false,
  },
  from_airport_sfid: {
    type: DataType.STRING(18),
    allowNull: false,
  },
  to_airport_sfid: {
    type: DataType.STRING(18),
    allowNull: false,
  },
  details: {
    type: DataType.JSONB,
    allowNull: true,
  },
  price: {
    type: DataType.FLOAT,
    allowNull: false,
  },
  // available_seats: {
  //   type: DataType.INTEGER,
  //   allowNull: true,
  // },
  currency_id: {
    type: DataType.UUID,
    allowNull: false,
  },
  aircraft_sfid: {
    type: DataType.STRING(18),
    allowNull: false,
  },
  featured: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  published: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // opportunity_sfid: {
  //   type: DataType.STRING(18),
  //   allowNull: false,
  // },
  user_id: {
    type: DataType.UUID,
    allowNull: false,
  },
  created_at: {
    type: DataType.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataType.DATE,
    allowNull: true,
  },
  deleted_at: {
    type: DataType.DATE,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
  paranoid: true,
});

EmptyLeg.associate = ({
  SFAirport,
  SFAircraftModel,
  SFOpportunity,
  User,
  Currency,
}) => {
  EmptyLeg.belongsTo(Currency, {
    foreignKey: 'currency_id',
    as: 'currency',
  });
  EmptyLeg.belongsTo(SFAirport, {
    constraints: false,
    foreignKey: 'from_airport_sfid',
    targetKey: 'sfid',
    as: 'fromAirport',
  });
  EmptyLeg.belongsTo(SFAirport, {
    constraints: false,
    foreignKey: 'to_airport_sfid',
    targetKey: 'sfid',
    as: 'toAirport',
  });
  EmptyLeg.belongsTo(SFAircraftModel, {
    constraints: false,
    foreignKey: 'aircraft_sfid',
    targetKey: 'sfid',
    as: 'aircraft',
  });
  EmptyLeg.belongsTo(SFOpportunity, {
    constraints: false,
    foreignKey: 'opportunity_sfid',
    targetKey: 'sfid',
    as: 'opportunity',
  });
  EmptyLeg.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author',
  });
};

export default EmptyLeg;