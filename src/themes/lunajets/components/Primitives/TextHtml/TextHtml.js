/**

 * // USAGE:

 * <TextHtml
    id='app.greeting'
    description='Greeting to welcome the user to the app'
    defaultMessage='Hello, <a href="{url}">{name}</a>!'
    values={{
      name: 'Click Here',
      url: 'google.com'
    }}
  />

 * // Something i came up with that might be explored:

 * import ReactDOMServer from 'react-server/server'
 * const Bold = () => <b dangerouslySetInnerHTML={{__html: "{text}"}} />
 * const markupBold = ReactDOMServer.renderToString(<Bold />)
 * <TextHtml
    id='app.as'
    description='Greeting to welcome the user to the app'
    defaultMessage={markupBold}
    values={{
      text: 'Bold text',
    }}
  />
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, injectIntl } from 'react-intl';

// temporary work-around (see https://github.com/yahoo/babel-plugin-react-intl/issues/119)
const TextHtml = (props) => {
  return <FormattedHTMLMessage {...props} />;
}

TextHtml.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  defaultMessage: PropTypes.string,
  values: PropTypes.object, // eslint-disable-line
};

TextHtml.defaultProps = {
  className: 'text',
  id: 'undefined'
};

TextHtml.propSchema = {}

export default injectIntl(TextHtml);
export const component = {
  defaultProps: TextHtml.defaultProps,
  propTypes: TextHtml.propTypes,
  propSchema: TextHtml.propSchema,
  category: 'primitive',
  tags: [
    'text',
    'html',
    'message',
  ],
};
