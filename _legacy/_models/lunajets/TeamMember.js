import Sequelize from 'sequelize';
import DataType from 'sequelize';
import Model from '../../sequelize';
const TeamMember = Model.define('team_members', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataType.STRING(40),
    allowNull: false,
  },
  last_name: {
    type: DataType.STRING(40),
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: true,
  },
  title: {
    type: DataType.STRING(40),
    allowNull: false,
  },
  bio: {
    type: DataType.TEXT,
    allowNull: true,
  },
  visible: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  flags: {
    type: DataType.ARRAY(DataType.STRING(2)),
    allowNull: true,
  },
}, {
  schema: 'public',
});



export default TeamMember;