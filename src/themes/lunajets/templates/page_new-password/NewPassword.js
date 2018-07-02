import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './newPassword.css';
import Text from "../../components/Primitives/Text";
import Image from "../../components/Primitives/Image";
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import { setNewPassword } from '../../actions/auth';
import history from 'core/history';

class NewPassword extends Component {

  state = {
    password: '',
    confirm_password: '',
    redirecting: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const change = await this.props.setNewPassword({
      password: this.state.password,
      token: this.props.token,
    });


    if (change.success) {
      this.setState({
        redirecting: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirecting === true) {
      setTimeout(() => {
        history.push('/?action=login');
      }, 3000);
    }
  }

  render() {

    return (
      <div className={cx(s.dashboard)}>
        <h1>Setup new password</h1>
        <p>we've updated our website we're ensuring you setup a new password</p>

        {
          (!this.state.redirecting)
          ?
            <form onSubmit={this.handleSubmit}>
              <input type="password" name="password" onChange={this.handleChange} />
              <input type="password" name="confirm_password" onChange={this.handleChange} />
              <button type="submit">Confirm Changes</button>
            </form>
          :
            <span>
              Wait while we redirect you to login page ...
            </span>
        }
        
        
      </div>
    )
  }
}

export default connect(null, { setNewPassword })(withStyles(s)(NewPassword))
