export default (sequelize, DataType) =>
  sequelize.define('team_members', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataType.STRING(40),
      allowNull: false,
    },
    last_name: {
      type: DataType.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: true,
    },
    visible: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    flags: {
      type: DataType.ARRAY(DataType.STRING(2)),
      allowNull: true,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ TeamMemberTranslation, Language, TeamMember, TeamDepartment, User, MediaLibrary }) {

        TeamMember.belongsToMany(Language, {
          as: 'Translation',
          foreignKey: 'team_member_id',
          through: TeamMemberTranslation,
        });
        
        TeamMember.belongsToMany(TeamDepartment, {
          as: 'Departments',
          foreignKey: 'team_member_id',
          through: 'team_departments_members',
          timestamps: false,
        });
        
        TeamMember.belongsTo(User, {
          as: 'User',
          foreignKey: 'user_id',
        });

        TeamMember.belongsTo(MediaLibrary, {
          as: 'Photo',
          foreignKey: 'media_id',
        });
      }
    }
  });
