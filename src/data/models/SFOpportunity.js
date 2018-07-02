import DataType from 'sequelize';
import Model from '../sequelize';

const SFOpportunity = Model.define('opportunity', {
  total_flight_time_minutes__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  communication_language__c: {
    type: DataType.STRING,
    allowNull: true
  },
  contact__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  vendor_resp_4_quote__r__externalid__c: {
    type: DataType.STRING(36),
    allowNull: true
  },
  flight_date__c: {
    type: DataType.DATEONLY,
    allowNull: true
  },
  closedate: {
    type: DataType.DATEONLY,
    allowNull: true
  },
  departure_date_and_time__c: {
    type: DataType.DATE,
    allowNull: true
  },
  stagename: {
    type: DataType.STRING(40),
    allowNull: true
  },
  vendor_resp_4_quote__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  trip_legs_amount__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  contact__r__externalid__c: {
    type: DataType.STRING(36),
    allowNull: true
  },
  name: {
    type: DataType.STRING(120),
    allowNull: true
  },
  iswon: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true
  },
  quote_for_contract__r__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true
  },
  isclosed: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  quote_for_contract__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true
  }
}, {
  tableName: 'opportunity',
  schema: 'salesforce',
  timestamps: false,
});

SFOpportunity.associate = ({
  SFOperatorQuote,
  SFContact,
  SFTrip,
  SFEmailMessage,
}) => {
  // opportunity belongs to a customer contact (...)
  SFOpportunity.belongsTo(SFContact, {
    foreignKey: 'contact__c',
    targetKey: 'sfid',
    as: 'Customer',
  });
  // (...) and a sales representative
  SFOpportunity.belongsTo(SFContact, {
    foreignKey: 'vendor_resp_4_quote__c',
    targetKey: 'sfid',
    as: 'Vendor',
  });
  // when the customer picks on offer 
  SFOpportunity.belongsTo(SFOperatorQuote, {
    foreignKey: 'quote_for_contract__c',
    targetKey: 'sfid',
    as: 'Quote'
  });
  // an opportunity has multiple legs
  SFOpportunity.hasMany(SFTrip, {
    foreignKey: 'opportunity__c',
    sourceKey: 'sfid',
    as: 'Legs',
  });
  // an opportunity has many messages exchanged with customer
  SFOpportunity.hasMany(SFEmailMessage, {
    foreignKey: 'relatedtoid',
    sourceKey: 'sfid',
    as: 'Emails',
  });
};

export default SFOpportunity;