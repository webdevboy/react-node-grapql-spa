export default (sequelize, DataType) =>
  sequelize.define('team_members_translations', {
    bio: {
      type: DataType.TEXT,
      allowNull: true,
    },
    title: {
      type: DataType.STRING(80),
      allowNull: false,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ TeamMemberTranslation, Language, TeamMember }) {

        TeamMemberTranslation.belongsTo(Language, {
          as: 'Translation',
          foreignKey: 'language_id',
        });
        
        TeamMemberTranslation.belongsTo(TeamMember, {
          as: 'TeamMember',
          foreignKey: 'team_member_id',
        });
      }
    }
  });
