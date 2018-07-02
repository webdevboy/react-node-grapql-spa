import React, { Component } from 'react'
import Wrapper from './Wrapper';
import Builder from './components/Builder';
import react from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';

// import PageBuilderActions from './actions';
import { rootReducer as PageBuilderReducer } from './store';

export default withStyles(s)(
  (props) => {
    return (
      <Wrapper context={{...props}}>
        <Builder />
      </Wrapper>
    )
  }
)
export { PageBuilderReducer }
