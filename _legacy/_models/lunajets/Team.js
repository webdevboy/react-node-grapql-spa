import Sequelize from 'sequelize';
import DataType from 'sequelize';
import Model from '../../sequelize';

const Team = Model.define('team_departments', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(60),
    allowNull: false,
  },
  description: {
    type: DataType.STRING(120),
    allowNull: false,
  },
  order: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  schema: 'public',
  underscored: true,
  timestamps: false
});



export default Team;