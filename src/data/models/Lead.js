import DataType from 'sequelize';
import Model from '../sequelize';

const Lead = Model.define('leads', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  lead_sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  raw_data: {
    type: DataType.JSONB,
    allowNull: true,
  },
  status: {
    type: DataType.ENUM(['SUCCESS', 'ERROR']),
    allowNull: false,
  },
  request_type: {
    type: DataType.STRING,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

Lead.associate = ({ SFContact }) => {
  Lead.belongsTo(SFContact, {
    as: 'contact',
    foreignKey: 'contact_sfid',
    targetKey: 'sfid',
  });
};


export default Lead;