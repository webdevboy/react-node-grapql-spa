import DataType from 'sequelize';
import Model from '../sequelize';

const SFFleetAircraft = Model.define('fleet_aircraft__c', {
	aircraft_model__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	home_base_airport__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	home_base_airport__r__externalid__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	aircraft_model__r__externalid__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	name: {
		type: DataType.STRING,
		allowNull: true
	},
	aoc__c: {
		type: DataType.STRING,
		allowNull: true
	},
	operator__r__externalid__c: {
		type: DataType.STRING(18),
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
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	externalid__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	operator__c: {
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
	tableName: 'fleet_aircraft__c',
	schema: 'salesforce',
	timestamps: false,
});

SFFleetAircraft.associate = ({
	SFFleetAircraft,
	SFAccount,
	SFAircraftModel,
	SFAirport,
}) => {
	SFFleetAircraft.belongsTo(SFAccount, {
		foreignKey: 'operator__c',
		targetKey: 'sfid',
		as: 'Operator',
	});
	SFFleetAircraft.belongsTo(SFAircraftModel, {
		foreignKey: 'aircraft_model__c',
		targetKey: 'sfid',
		as: 'Aircraft',
	});
	SFFleetAircraft.belongsTo(SFAirport, {
		foreignKey: 'home_base_airport__c',
		targetKey: 'sfid',
		as: 'BaseAirport',
	});
};

export default SFFleetAircraft;