export default (sequelize, DataType) =>
  sequelize.define('article_tags', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    tag: {
      type: DataType.STRING(80),
      allowNull: false,
    },
    slug: {
      type: DataType.STRING(80),
      allowNull: true,
    },
  }, {
    schema: 'public',
    tableName: 'article_tags',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ ArticleTag, Article, Language }) {
        ArticleTag.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });
        ArticleTag.belongsToMany(Article, {
          foreignKey: 'tag_id',
          through: 'article_posts_tags',
          timestamps: false,
          as: 'Articles',
        });
      },
    },
  });
