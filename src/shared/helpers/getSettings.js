import { isArray, isString } from 'lodash';
import { Settings } from '../../data/models';
import parseSettings from './parseSettings';

const EMPTY_OBJECT = {};

export default async function getSettings(_options) {
  if (isArray(_options) || isString(_options)) {
    const options = isArray(_options) ? _options : [_options];
    const settingsArr = await Settings.findAll({
      where: {
        option: {
          $in: options,
        },
      },
      raw: true,
    });
    const settings = parseSettings(settingsArr);
    return settings;
  }
  return EMPTY_OBJECT;
};