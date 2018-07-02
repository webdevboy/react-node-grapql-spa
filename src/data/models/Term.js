import DataType from 'sequelize';
import Model from '../sequelize';
import slugify from '../../core/generateSlug';

const Term = Model.define('terms', {
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
    type: DataType.STRING(120),
    allowNull: false,
  },
  meta: {
    type: DataType.JSONB,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
  hooks: {
    beforeValidate: async (term) => {
      if (term.isNewRecord) {
        if (term.slug) {
          const count = await Term.count({ where: { slug: term.slug } });
          term.slug = (count > 0) ? `${term.slug}-${count + 1}` : term.slug;
        } else {
          const slug = slugify(term.name, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
          const count = await Term.count({ where: { slug: slug } });
          
          term.slug = (count > 0) ? `${slug}-${count + 1}` : slug;
        }
      }
    },
  },
});

Term.associate = ({ Term, Language, TermTaxonomy }) => {
  Term.hasMany(TermTaxonomy, {
    as: 'taxonomies',
    foreignKey: 'term_id',
    onDelete: 'CASCADE'
  });
  Term.hasOne(TermTaxonomy, {
    as: 'parent',
    foreignKey: 'parent_id',
    onDelete: 'CASCADE'
  });
  Term.belongsTo(Language, {
    foreignKey: 'language_id',
    as: 'language',
  });
};

export default Term;
