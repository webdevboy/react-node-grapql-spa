/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { connect } from 'react-redux';
import cx from 'classnames';

class Html extends React.Component {
  static propTypes = {
    meta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.string,
      keywords: PropTypes.string,
    }),
    social: PropTypes.shape({
      facebook: PropTypes.object,
      twitter: PropTypes.object
    }),
    store: PropTypes.shape({
      appstore: PropTypes.object
    }),
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    app: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    isMaintenance: PropTypes.bool.isRequired,
    homePage: PropTypes.string.isRequired,
    hreflangs: PropTypes.array,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    hreflangs: [],
    isMaintenance: false,
  };

  /**
   * FACEBOOK META
    <meta property="og:url" content={`${app.apiUrl}${app.path}`} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />          
   */

  render() {
    const {
      meta,
      analytics,
      styles,
      scripts,
      app,
      children,
      hreflangs,
      isMobile
    } = this.props;

    return (
      <html lang={app.lang}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':`+
          `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],`+
          `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=`+
          `'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);`+
          `})(window,document,'script','dataLayer','GTM-KHDQZWV');`}} />

          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{ meta && meta.title || 'Untitled' }</title>
          <meta name="description" content={meta && meta.description} />
          { (meta && meta.keywords) ? <meta name="keywords" content={meta.keywords} /> : null }
          { (meta && meta.author) ? <meta name="author" content={meta.author} /> : null }
          { (meta && meta.author) ? <meta name="author" content={meta.author} /> : null }
          { (hreflangs) ? hreflangs.map(({ locale, path }) => <link rel="alternate" hreflang={locale} href={`${path}`} />) : null }
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
          <meta name="apple-itunes-app" content="app-id=462220739, app-argument=lunajetsapp://" />

          <link rel="preconnect" href={app.apiUrl} />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700" />
          {/* <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu&subset=cyrillic,cyrillic-ext"/>
          <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu+Condensed&subset=cyrillic,cyrillic-ext" /> */}
          {/* <link type="text/css" rel="stylesheet" href="https://fast.fonts.net/cssapi/8df5ce45-54da-445d-8ffa-ad3c1e62290d.css" /> */}
          { styles.map((style, index) => <style type='text/css' key={index} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />)}
        </head>
        <body className={cx((isMobile) ? 'mobile' : '')}>
          <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-KHDQZWV" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          {scripts.map(script => <script key={script} src={script} />)}
         
          

          {/* {analytics && analytics.google && <script src="https://www.google-analytics.com/analytics.js" async defer />} */}
        </body>
      </html>
    );
  }
}

export default Html;