import React, { Component } from "react";
import PropTypes from 'prop-types';
import Page from '../page';
import NewPassword from './NewPassword';

const page = {
  subscriptor: false,
  footer: false,
  header: {
    request_flight: false,
  }
};

class NewPasswordPage extends Component {

  render() {    
    return (
      <div>
        <Page {...page}>
          <div className="fix-nav-height" style={{height:'60px'}} />
          <NewPassword token={this.props.token} />
        </Page>
      </div>
    );
  }

}

export default NewPasswordPage;