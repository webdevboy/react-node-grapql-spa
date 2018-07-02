import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_Country = Model.define('country__c', {
	name: {
		type: DataType.STRING,
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	country_dialling_code__c: {
		type: DataType.STRING,
		allowNull: true
	},
	_hc_err: {
		type: DataType.TEXT,
		allowNull: true
	},
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
	id: {
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	country_code__c: {
		type: DataType.STRING,
		allowNull: true
	},
	sfid: {
		type: DataType.STRING,
		allowNull: true
	},
	name_de__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_es__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_en__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_it__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_ru__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_pl__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_hu__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name_fr__c: {
		type: DataType.STRING,
		allowNull: true
	},
	externalid__c: {
		type: DataType.STRING,
		allowNull: true
	}
}, {
	tableName: 'country__c',
	schema: 'salesforce',
	underscored: true,
  	timestamps: false
});

export default SF_Country;