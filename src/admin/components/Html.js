import React from "react";
import PropTypes from "prop-types";
import serialize from "serialize-javascript";
import { connect } from "react-redux";
import cx from "classnames";

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    app: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    locale: PropTypes.string,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  constructor(props) {
    super(props);
    this.isMobile = false;
  }

  render() {
    const { title, type, path, styles, scripts, app, children } = this.props;

    return (
      <html lang={app.lang}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" />
          <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu+Mono&subset=cyrillic,cyrillic-ext" />
          <link type="text/css" rel="stylesheet" href="https://fast.fonts.net/cssapi/8df5ce45-54da-445d-8ffa-ad3c1e62290d.css" />

          {styles.map((style, index) => (
            <style
              type="text/css"
              key={index}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))
          }
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
