import DataType from 'sequelize';
import Model from '../sequelize';

const SFOperatorQuote = Model.define('operator_quote__c', {
	name: {
		type: DataType.STRING(80),
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
	opportunity__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	systemmodstamp: {
		type: DataType.DATE,
		allowNull: true
	},
	fleet_aircraft__r__externalid__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	fleet_aircraft__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	externalid__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	opportunity__r__externalid__c: {
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
	tableName: 'operator_quote__c',
	schema: 'salesforce',
	timestamps: false,
});

SFOperatorQuote.associate = ({
	SFAccount,
	SFFleetAircraft,
	SFOpportunity,
}) => {
	// quote belongs to an operator account
	SFOperatorQuote.belongsTo(SFAccount, {
		foreignKey: 'operator__c',
		targetKey: 'sfid',
		as: 'Operator',
	});
	// quote belongs to a fleet
	SFOperatorQuote.belongsTo(SFFleetAircraft, {
		foreignKey: 'fleet_aircraft__c',
		targetKey: 'sfid',
		as: 'Fleet',
	});
	// quote belongs to an opportunity
	SFOperatorQuote.belongsTo(SFOpportunity, {
		foreignKey: 'opportunity__c',
		targetKey: 'sfid',
		as: 'Opportunity',
	});
};

export default SFOperatorQuote;