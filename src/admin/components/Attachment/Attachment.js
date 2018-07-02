import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Attachment.css';
import cx from 'classnames';
import { capitalize } from 'lodash';
import * as FileTypesSvg from 'react-extensions-svg';

const messages = defineMessages({

});

// const getTextAreaPlaceholder = () => intl. {...messages.placeholder} />
const RenderExtensionIcon = ({ extension }) => {

  const props = {
    color: '#FFFFFF',
    size: '32px'
  };

  return React.createElement(FileTypesSvg[capitalize(extension)], props);

}

class Attachment extends React.Component {
  
  render() {
    return null
  }
}

export default withStyles(s)(Attachment);

