import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './404.css';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.fill} />
        <div className={s.container}>
          <h1 className={cx(s.title, 'conduit')}>OOPS!</h1>
          <div className={s.msgwrapper}>
            <p className={s.msg}>
              We can't seem to find the page you're looking for.
              <span className={cx(s.errorcode, 'conduit')}>
                Error code: <b>404</b>
              </span>
            </p>
          </div>

          <div className={s.mainaction}>
            <a href="/" className="btn lt-red">Continue to home</a>
          </div>

          <div className={s.links}>
            <a href="#" className="conduit">
              Book a flight
            </a>
            <a href="#" className="conduit">
              Search for empty legs
            </a>
            <a href="#" className="conduit">
              Contact Us
            </a>
          </div>

          <div className={s.logo} />

        </div>
      </div>
    );
  }
}

export default withStyles(s)(PageNotFound);
