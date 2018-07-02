import Sequelize from 'sequelize';
import DataType from 'sequelize';
import Model from '../../sequelize';

const Article = Model.define('articles', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  summary: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  slug: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  body: {
    type: DataType.JSON,
    allowNull: true,
  },
  publish_at: {
    type: DataType.DATE,
    defaultValue: Sequelize.NOW,
  },
  source: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  state: {
    type: DataType.ENUM('draft', 'published', 'pending'),
    defaultValue: 'draft',
    allowNull: false,
  },
  tags: {
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: true,
  },
  featured: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  article_id: {
    type: DataType.STRING(8),
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
  paranoid: true,
});

export default Article;
