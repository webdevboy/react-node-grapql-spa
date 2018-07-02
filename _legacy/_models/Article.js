export default (sequelize, DataType) =>
  sequelize.define('articles', {
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
      type: DataType.STRING(255),
      allowNull: true,
    },
    body: {
      type: DataType.JSON,
      allowNull: true,
    },
    publish_at: {
      type: DataType.DATE,
      defaultValue: sequelize.NOW,
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
    classMethods: {
      associate({
        Article,
        User,
        MediaLibrary,
        Language,
        ArticleCategory,
        ArticleTag,
      }) {
        Article.belongsTo(User, {
          as: 'Author',
          foreignKey: 'user_id',
        });
        Article.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });
        Article.belongsTo(ArticleCategory, {
          as: 'Category',
          foreignKey: 'category_id',
        });
        Article.belongsTo(MediaLibrary, {
          as: 'Image',
          foreignKey: 'media_id',
        });
        Article.belongsToMany(MediaLibrary, {
          as: 'Gallery',
          foreignKey: 'article_id',
          through: 'article_gallery',
          underscored: true,
          timestamps: false,
        });
        Article.belongsToMany(ArticleTag, {
          foreignKey: 'article_id',
          through: 'article_posts_tags',
          timestamps: false,
          as: 'Tags',
        });
      },
    },
  });
