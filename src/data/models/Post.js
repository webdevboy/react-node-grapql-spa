/* eslint-disable */
import Promise from "bluebird";
import DataType from 'sequelize';
import Model from '../sequelize';
import slugify from "../../core/generateSlug";

const Post = Model.define("posts", {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  post_id: {
    type: DataType.STRING(50),
    allowNull: false,
  },
  title: {
    type: DataType.STRING(120),
    allowNull: false,
  },
  slug: {
    type: DataType.STRING(120),
    allowNull: false,
  },
  summary: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  meta: {
    type: DataType.JSONB,
    allowNull: true,
  },
  body: {
    type: DataType.JSONB,
    allowNull: true,
  },
  publish_at: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
  state: {
    type: DataType.ENUM("draft", "published", "pending", "protected"),
    defaultValue: "draft",
    allowNull: false,
  },
  type: {
    // post, page, event, destination, partner, office, review, team-member
    type: DataType.STRING(20),
    allowNull: false,
  },
},
{
  paranoid: true,
  schema: "public",
  underscored: true,
  timestamps: true,
});

Post.hook('beforeValidate', async (post, options) => {

  // console.log('HERERERERER', post);
  // post.slug = slugify(post.title, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
  if (post.slug === null || typeof post.slug === 'undefined') {
    const slug = slugify(post.title, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
    
    const count = await Post.count({ where: { slug }});
    if (count > 0) {
      post.slug = `${slug}-${count + 1}`;
    } else {
      post.slug = slug;
    }
  }
});

Post.prototype.getAncestors = async function() {
  let ancestors;
  const cb = function(a) {
    ancestors = a;
  };
  const self = this;

  const depth = async (instance, acc = []) => {
    const parent = await instance.getParent();
    if (!parent) {
      return cb(acc);
    }
    acc.push(parent);
    await depth(parent, acc);
  };

  await depth(self);
  return ancestors;
};

Post.associate = ({
  Language,
  MediaLibrary,
  User,
  Post,
  TermTaxonomy,
  Term,
}) => {
  Post.belongsTo(Language, {
    foreignKey: "language_id",
    as: "translation",
  });
  Post.belongsTo(User, {
    foreignKey: "user_id",
    as: "author",
  });
  Post.belongsTo(MediaLibrary, {
    foreignKey: "media_id",
    as: "image",
  });
  Post.belongsToMany(MediaLibrary, {
    foreignKey: "post_id",
    as: "gallery",
    through: "post_gallery",
    timestamps: false,
  });
  Post.belongsTo(Post, {
    as: "parent",
    foreignKey: "parent_id",
  });
  Post.hasMany(Post, {
    as: "children",
    foreignKey: "parent_id",
    onDelete: "SET NULL",
  });
  Post.belongsToMany(TermTaxonomy, {
    as: "taxonomies",
    foreignKey: "post_id",
    through: "post_terms_taxonomy",
    timestamps: false,
    onDelete: "CASCADE",
  });
};

export default Post;