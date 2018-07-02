import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './inspector.css';
import cx from 'classnames'; 

class Inspector extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) { 
  }

  render() {
    return (
      <div className={cx('container',s['container'], (this.props.fixed ? s['fixed'] : s['']), (!this.props.fixed ? (this.props.inspectorState  ? s['open'] : s['close']) : ''))}>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});


export default withStyles(s)(Inspector);