import forEach from 'lodash/forEach';

export default function parseSettings(_settings) {
  const settings = {};

  forEach(_settings, (setting) => {
    settings[setting.option] = setting.value;
  });

  return settings;
};