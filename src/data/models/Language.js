import DataType from 'sequelize';
import Model from '../sequelize';
import { redisClient } from '../cache';

const resetCache = () => {
  redisClient.delWildcard("languages*", () => {
    console.info('redis cleared languages * ');     // done...
  });
};

const Language = Model.define('languages', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  enabled: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  locale: {
    type: DataType.STRING(2),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Duplicated locales are now allowed!',
    },
  },
  language: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  native: {
    type: DataType.STRING(60),
    allowNull: true,
  },
  rtl: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
  hooks: {
    afterCreate: () => resetCache(),
    afterDestroy: () => resetCache(),
    afterUpdate: () => resetCache(),
    afterSave: () => resetCache(),
    afterUpsert: () => resetCache(),
  }
});

Language.associate = ({
  MediaLibrary,
  MediaTranslation,
  StringTranslation,
  RichTextTranslation,
}) => {
  Language.hasMany(RichTextTranslation, {
    foreignKey: 'language_id',
    as: 'RichTextTranslation',
  });
  
  // language has many media
  Language.hasMany(MediaTranslation, {
    as: 'MediaTranslations',
    foreignKey: 'language_id',
    // through: MediaTranslation,
    timestamps: false,
  });

  // a language has many strings translated
  Language.hasMany(StringTranslation, {
    foreignKey: 'language_id',
    as: 'translations',
  });
};


export default Language;