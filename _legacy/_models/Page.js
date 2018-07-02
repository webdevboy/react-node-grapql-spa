export default (sequelize, DataType) =>
  sequelize.define('pages', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataType.ARRAY(DataType.TEXT),
      allowNull: false,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    template: {
      type: DataType.STRING,
      allowNull: false,
    },
    body: {
      type: DataType.JSON,
      allowNull: true,
    },
    isHome: {
      type: DataType.BOOLEAN,
      default: false,
      allowNull: false,
    },
    query: {
      type: DataType.TEXT,
      allowNull: true,
    },
    external_scripts: {
      type: DataType.ARRAY(DataType.TEXT),
      allowNull: true,
    },
    custom_script: {
      type: DataType.TEXT,
      allowNull: true,
    },
    state: {
      type: DataType.BOOLEAN,
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate({ Page, User }) {
        // a page belongs to a author (user)
        // * usefull to track who did what *
        Page.belongsTo(User, {
          as: 'Owner',
          foreignKey: 'user_id',
        });

        // a page can belong to another page
        Page.belongsTo(Page, {
          as: 'Children',
          foreignKey: 'parent_id',
        });

      },
    },
  });
