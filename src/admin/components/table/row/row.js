import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './row.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import Checkbox from '../../Checkbox';
import _ from 'lodash';


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.activate = this.activate.bind(this);
    this.state = {
      active: false,
    }
  }

  handleDoubleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  activate(ev){
    this.setState({
      active: !this.state.active,
    });
    this.props.remove(this.props.data.id);
  }

  render() {
    return (
      <tr onDoubleClick={this.handleDoubleClick} className={this.state.active ? s['active'] : ''}>
        {this.props.checkbox ? <td><Checkbox for={this.props.data.id} change={this.activate}/></td> : ''}
        {Object.keys(this.props.data).filter((item,index) => {return this.props.values.indexOf(item) !== -1}).map((item,index) => <td key={index}>{this.props.data[item]}</td> )}        
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(withStyles(s)(Row));
