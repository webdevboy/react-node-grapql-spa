import DataType from 'sequelize';
import Model from '../../sequelize';

const Testimonials = Model.define('testimonials', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataType.DATE,
    allowNull: false,
  },
  testimonial: {
    type: DataType.TEXT,
    allowNull: false,
  },
  mask_name: {
    type: DataType.STRING,
    allowNull: true,
  }
},{
  schema: 'public',
  underscored: true,
  timestamps: false
});
export default Testimonials;