import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './table.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import Row from './row';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    };
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
        <div className={s['content']}>
          <table className={cx('table',s['table'])}>
              <thead>
                <tr>
                  {this.props.headers.map((header,index) => {return <th key={index}>{header}</th>})}
                </tr>
              </thead>
              <tbody>
                 {this.props.data.filter(c => {return (_.includes(c[this.props.values[0]],this.props.search))} ).map((data) =>
                    <Row key={data.id} data={data} checkbox={this.props.checkbox} values={this.props.values} remove={this.props.remove}/>
                  )}
              </tbody>
          </table>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, {  })(withStyles(s)(Table));