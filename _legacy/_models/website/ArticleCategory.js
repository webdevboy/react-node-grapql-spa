import DataType from 'sequelize';
import Model from '../../sequelize';

const ArticleCategory = Model.define('articleCategories', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING(120),
    allowNull: false,
  },
  slug: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  description: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  cat_id: {
    type: DataType.STRING(80),
    allowNull: false,
  },
}, {
  schema: 'public',
  tableName: 'article_categories',
  underscored: true,
  timestamps: false,
});

export default ArticleCategory;
