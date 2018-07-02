import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import auth from './auth';
import runtime from './runtime';
import intl from './intl';
import settings from './settings';
import pages from './pages';
import templates from './templates';
import editor from './editor';
import admin from './admin';
import media from './media';
import backdrop from './backdrop';
import navigation from './navigation';
import currentTalks from './currentTalks';
import sidebar from './sidebar';
import components from './components';
import chat from './chat';
import toggleSelection from './toggleSelection';
import users from '../../admin/reducers/users';
import roles from '../../admin/reducers/userRoles';

import offices from './offices';
import teams from './team';
import articles from './articles';
import tableSelection from './tableSelection';
import sticky from'./sticky';
import rtc from'./rtc';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    auth,
    runtime,
    intl,
    settings,
    pages,
    templates,
    editor: undoable(editor, {debug: false}),
    admin,
    media,
    components,
    chat,
    roles,
    users,
    
    offices,
    teams,
    rtc,
    articles,
    sticky,
    interface: combineReducers({
        backdrop,
        navigation,
        currentTalks,
        sidebar,
        toggleSelection,
        tableSelection,
    }),
  });
}