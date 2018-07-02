export default (sequelize, DataType) =>
  sequelize.define('team_departments', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    description: {
      type: DataType.STRING(120),
      allowNull: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ TeamMember, TeamDepartment, TeamDepartmentTranslation, Language }) {

        TeamDepartment.belongsToMany(Language, {
          as: 'Translations',
          foreignKey: 'team_department_id',
          through: TeamDepartmentTranslation,
        });

        TeamDepartment.belongsToMany(TeamMember, {
          as: 'Members',
          foreignKey: 'team_department_id',
          through: 'team_departments_members',
          timestamps: false,
        });

      }
    }
  });
