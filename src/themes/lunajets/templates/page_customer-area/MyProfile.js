import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './my-profile.scss';

import AdvisorDetail from "themes/lunajets/components/Content/Detail/AdvisorDetail";
import AccountDetails from 'themes/lunajets/components/Content/MyProfile/AccountDetails';
import NewsLetter from 'themes/lunajets/components/Content/MyProfile/NewsLetter';
import FavouriteAirports from 'themes/lunajets/components/Content/MyProfile/FavouriteAirports';
import Saved from 'themes/lunajets/components/Content/MyProfile/Modals/Saved';
import ChangePassword from 'themes/lunajets/components/Content/MyProfile/Modals/ChangePassword';
import NewPassword from 'themes/lunajets/components/Content/MyProfile/Modals/NewPassword';
import ForgotPassword from 'themes/lunajets/components/Content/MyProfile/Modals/ForgotPassword';
import ForgotPasswordConfirm from 'themes/lunajets/components/Content/MyProfile/Modals/ForgotPasswordConfirm';
import DeleteAirport from 'themes/lunajets/components/Content/MyProfile/Modals/DeleteAirport';
import AddedAirport from 'themes/lunajets/components/Content/MyProfile/Modals/AddedAirport';

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalType: '',
      openedModal: false
    }

    this.toggleOpenedModal = this.toggleOpenedModal.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
  }

  toggleOpenedModal(state, type) {

    this.setState({
      modalType: type,
      openedModal: state
    });
  }

  getModalContent(type) {
    
    switch(type) {
      case "saved":
        return <Saved toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      case "change-password":
        return <ChangePassword toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      case "new-password":
        return <NewPassword toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      case "forgot-password":
        return <ForgotPassword toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      case "forgot-password-confirm":
        return <ForgotPasswordConfirm toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      case "delete-airport":
        return <DeleteAirport toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      case "added-airport":
        return <AddedAirport toggleOpenedModal={this.toggleOpenedModal}/>;
        break;
      default:
        return null;
        break; 
    }

  }

  render() {
    const { modalType, openedModal } = this.state;

    return (
      <div className={cx(s["my-profile-root"])}>
        <div className={cx("row", s.row)}>
          <div className={cx("col-sm-6 col-12", s.lc)}>
            <AccountDetails toggleOpenedModal={this.toggleOpenedModal}/>

            <div className="d-none d-sm-block">
              <NewsLetter />
            </div>
          </div>
          <div className={cx("col-sm-6 col-12", s.rc)}>
            <div className={s["advisor-zone"]}>
              <AdvisorDetail />
            </div>
            <FavouriteAirports toggleOpenedModal={this.toggleOpenedModal}/>

            <div className="d-block d-sm-none">
              <NewsLetter />
            </div>
          </div>
        </div>

        {openedModal &&
        <div className={cx(s["modal-root"])}>
          <div className={cx(s["modal-content"])}>
            {this.getModalContent(modalType)}
          </div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(MyProfile))
