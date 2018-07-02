import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./AccountDetails.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode () {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {  
    const { toggleOpenedModal } = this.props;
    const { editMode } = this.state;

    return (
      <div className={cx(s["account-details-root"])}>
        <h1 className={s.title}>
          <Text id="client.account.details.title" defaultMessage="Account Details" />
        </h1>

        <div className={s.contents}>
          {editMode
            ? <AccountEdit toggleEditMode={this.toggleEditMode} toggleOpenedModal={toggleOpenedModal} />
            : <AccountDetail toggleEditMode={this.toggleEditMode} />
          }
        </div>        
      </div>
    );
  }
}


export default withStyles(s)(AccountDetails);
