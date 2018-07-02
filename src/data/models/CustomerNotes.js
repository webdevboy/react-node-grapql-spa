import DataType from 'sequelize';
import Model from '../sequelize';

const CustomerNotes = Model.define('chat_customer_notes', {}, {
  timestamps: false,
  schema: 'public',
});

export default CustomerNotes;
  
