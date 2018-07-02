import {
    SHOW_SEARCH
  } from '../constants/navbar';
  
  export const showSearch = (status) => ({
    type: SHOW_SEARCH,
    payload: status
  })
  