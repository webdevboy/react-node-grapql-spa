import intl from './intl';
import rtc from './rtc';
import media from './media';
import runtime from './runtime';
import rates from './rates';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default {
  intl,
  rtc,
  media,
  runtime,
  rates,
  loadingBar: loadingBarReducer
};
