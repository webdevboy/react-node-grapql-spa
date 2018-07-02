import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_AirportCity = Model.define('airport_city__c', {
	isdeleted: {
		type: DataType.BOOLEAN,
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	name_en__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_fr__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_pl__c: {
		type: DataType.STRING,
		allowNull: true
	},
	systemmodstamp: {
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
	name_de__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_it__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_es__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_hu__c: {
		type: DataType.STRING,
		allowNull: true
	},
	id: {
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	_hc_lastop: {
		type: DataType.STRING,
		allowNull: true
	},
	externalid__c: {
		type: DataType.STRING,
		allowNull: true
	},
	country__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_ru__c: {
		type: DataType.STRING,
		allowNull: true
	},
	sfid: {
		type: DataType.STRING,
		allowNull: true
	},
	location__latitude__s: {
		type: DataType.DOUBLE,
		allowNull: true
	},
	location__longitude__s: {
		type: DataType.DOUBLE,
		allowNull: true
	},
	// country__c__externalid__c: {
	// 	type: DataType.STRING,
	// 	allowNull: true
	// },

}, {
	tableName: 'airport_city__c',
	schema: 'salesforce',
	underscored: true,
  	timestamps: false
});

export default SF_AirportCity;