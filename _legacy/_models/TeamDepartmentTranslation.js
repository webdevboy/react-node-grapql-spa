export default (sequelize, DataType) =>
  sequelize.define('team_departments_translations', {
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    }
  }, {
    schema: 'public',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate({ TeamDepartmentTranslation, TeamDepartment, Language }) {

        TeamDepartmentTranslation.belongsTo(Language, {
          as: 'Language',
          foreignKey: 'language_id',
        });

        TeamDepartmentTranslation.belongsTo(TeamDepartment, {
          as: 'TeamDepartment',
          foreignKey: 'team_department_id',
        });

      }
    }
  });
