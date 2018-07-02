import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_Airport = Model.define('airport__c', {
	systemmodstamp: {
		type: DataType.DATE,
		allowNull: true
	},
	_hc_err: {
		type: DataType.TEXT,
		allowNull: true
	},
	isdeleted: {
		type: DataType.BOOLEAN,
		allowNull: true
	},
	name_fr__c: {
		type: DataType.STRING,
		allowNull: true
	},
	airport_city__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_hu__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_de__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_pl__c: {
		type: DataType.STRING,
		allowNull: true
	},
	externalid__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_ru__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_en__c: {
		type: DataType.STRING,
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	name_it__c: {
		type: DataType.STRING,
		allowNull: true
	},
	_hc_lastop: {
		type: DataType.STRING,
		allowNull: true
	},
	name_es__c: {
		type: DataType.STRING,
		allowNull: true
	},
	icao_code__c: {
		type: DataType.STRING,
		allowNull: true
	},
	time_to_utc__c: {
		type: DataType.DOUBLE,
		allowNull: true
	},
	name: {
		type: DataType.STRING,
		allowNull: true
	},
	sfid: {
		type: DataType.STRING,
		allowNull: true
	},
	iata_code__c: {
		type: DataType.STRING,
		allowNull: true
	},
	id: {
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name__c: {
		type: DataType.STRING,
		allowNull: true
	},
	helipad__c: {
		type: DataType.BOOLEAN,
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
}, {
	tableName: 'airport__c',
	schema: 'salesforce',
	underscored: true,
  	timestamps: false
});

export default SF_Airport;