import DataType from 'sequelize';
import Model from '../sequelize';

const SFTrip = Model.define('trip_leg__c', {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  // opportunity__externalid__c: {
  //   type: DataType.STRING(18),
  //   allowNull: true,
  // },
  name: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  departure_airport__r__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  departure_airport__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true,
  },
  departure_date__c: {
    type: DataType.DATE,
    allowNull: true,
  },
  totalflighttime__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  opportunity__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true,
  },
  arrival_airport__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  departure_time__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true,
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true,
  },
  arrival_airport__r__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  departure_date_and_time__c: {
    type: DataType.DATE,
    allowNull: true,
  },
  arrival_date__c: {
    type: DataType.DATE,
    allowNull: true,
  },
  arrival_time__c: {
    type: DataType.STRING,
    allowNull: true,
  },
}, {
  tableName: 'trip_leg__c',
  schema: 'salesforce',
  timestamps: false,
});

SFTrip.associate = ({
  SFAirport,
  SFOpportunity,
}) => {
  SFTrip.belongsTo(SFAirport, {
    foreignKey: 'departure_airport__c',
    as: 'DepartureAirport',
    targetKey: 'sfid',
  });
  SFTrip.belongsTo(SFAirport, {
    foreignKey: 'arrival_airport__c',
    as: 'ArrivalAirport',
    targetKey: 'sfid',
  });
  SFTrip.belongsTo(SFOpportunity, {
    foreignKey: 'opportunity__c',
    as: 'Opportunity',
    targetKey: 'sfid',
  });
};

export default SFTrip;