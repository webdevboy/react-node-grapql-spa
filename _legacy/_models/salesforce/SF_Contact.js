import DataType from 'sequelize';
import Model from '../../sequelize';


const SF_Contact = Model.define('contact', {
    systemmodstamp: {
      type: DataType.DATE,
      allowNull: true
    },
    isdeleted: {
      type: DataType.BOOLEAN,
      allowNull: true
    },
    _hc_lastop: {
      type: DataType.STRING,
      allowNull: true
    },
    lastname: {
      type: DataType.STRING,
      allowNull: true
    },
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sfid: {
      type: DataType.STRING(15),
    },
    phone: {
      type: DataType.STRING,
      allowNull: true
    },
    email: {
      type: DataType.STRING,
      allowNull: true
    },
    createddate: {
      type: DataType.DATE,
      allowNull: true
    },
    name: {
      type: DataType.STRING,
      allowNull: true
    },
    _hc_err: {
      type: DataType.TEXT,
      allowNull: true
    },
    firstname: {
      type: DataType.STRING,
      allowNull: true
    },
    type__c: {
      type: DataType.STRING,
      allowNull: true
    },
    accountid: {
      type: DataType.STRING,
      allowNull: true
    },
  }, {
    tableName: 'contact',
    schema: 'salesforce',
    paranoid: true,
    timestamps: false,

});

export default SF_Contact;