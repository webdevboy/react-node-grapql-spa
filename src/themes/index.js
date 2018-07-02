/* eslint-disable */
import base from './base';
import lunajets from './lunajets';

export const themes = {
  base,
  lunajets,
}

export const themesList = Object.keys(themes);

export default (name) => {
  
  const theme = themes[name];

  if (name !== 'base') {
    theme.templates = Object.assign(
      themes['base'].templates,
      theme.templates,
      {}
    );
  }

  return theme;
  
}