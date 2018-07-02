import DataType from 'sequelize';
import Model from '../sequelize';

const TermTaxonomy = Model.define('term_taxonomy', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  taxonomy: {
    type: DataType.STRING(40),
    allowNull: false,
  },
  description: {
    type: DataType.STRING(255),
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

TermTaxonomy.associate = ({ TermTaxonomy, Term, Post }) => {
  TermTaxonomy.belongsTo(Term, {
    foreignKey: 'term_id',
    as: 'term',
    onDelete: 'CASCADE',
  });
  TermTaxonomy.belongsTo(Term, {
    foreignKey: 'parent_id',
    as: 'parent',
  });
  TermTaxonomy.belongsToMany(Post, {
    as: 'posts',
    foreignKey: 'term_taxonomy_id',
    through: 'post_terms_taxonomy',
    timestamps: false,
    onDelete: 'CASCADE',
  });
};

export default TermTaxonomy;
