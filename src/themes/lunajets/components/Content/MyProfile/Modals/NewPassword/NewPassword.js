import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./NewPassword.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';

class NewPassword extends React.Component {
  render() {  
    const { toggleOpenedModal } = this.props;
    return (
      <div className={cx(s["saved-root"])}>
        <h1 className={s.title}>
          <Text id="client.modal.new.password.title" defaultMessage="NEW PASSWORD" />
        </h1>

        <div className={s.desc}>
          <Text id="client.modal.new.password.desc" defaultMessage="Your password bas been changed." />
        </div>

        <div className={cx(s.buttons)}>
          <button className={cx(s["pt-button"])} onClick={() => toggleOpenedModal(false, '')}>
            <Text id="client.modal.button.ok" defaultMessage="OK" />
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NewPassword);
