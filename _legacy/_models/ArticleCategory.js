export default (sequelize, DataType) =>
  sequelize.define('article_categories', {
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
      allowNull: true,
    },
  }, {
    schema: 'public',
    tableName: 'article_categories',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ ArticleCategory, Article, Language }) {
        ArticleCategory.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });
        ArticleCategory.hasMany(Article, {
          as: 'Articles',
          foreignKey: 'category_id',
        });
      },
    },
  });
