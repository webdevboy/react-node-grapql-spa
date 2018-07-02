import DataType from 'sequelize';
import Model from '../../sequelize';

const Note = Model.define('notes', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  body: {
    type: DataType.STRING,
    allowNull: false,
  },

}, {
  schema: 'public',
  underscored: true,
  timestamps: true

});

export default Note;