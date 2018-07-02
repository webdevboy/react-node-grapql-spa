import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./AccountDetail.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { toggleEditMode } = this.props;

    return (
      <div className={cx(s["account-detail-root"])}>
        <div className={cx(s["user-infos"])}>
          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.name" defaultMessage="Name:" />
            </div>
            <div className={cx(s.content)}>
              Mr Eymeric Segard
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.company" defaultMessage="Company:" />
            </div>
            <div className={cx(s.content)}>
              Lunajets SA
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.position" defaultMessage="Position:" />
            </div>
            <div className={cx(s.content)}>
              CEO
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.email" defaultMessage="Email:" />
            </div>
            <div className={cx(s.content)}>
              eymeric@lunajets.com
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.phone" defaultMessage="Phone:" />
            </div>
            <div className={cx(s.content)}>
              <i className={"famfamfam-flags ch"} /> +123 465 789
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.address" defaultMessage="Address:" />
            </div>
            <div className={cx(s.content)}>
              29 rue Lect
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.postcode" defaultMessage="Postcode:" />
            </div>
            <div className={cx(s.content)}>
              1217
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.city" defaultMessage="City:" />
            </div>
            <div className={cx(s.content)}>
              Geneva
            </div>
          </div>

          <div className={cx(s.list)}>
            <div className={cx(s.label)}>
              <Text id="client.account.detail.country" defaultMessage="Country:" />
            </div>
            <div className={cx(s.content)}>
              Switzerland
            </div>
          </div>
        </div>

        <div className={cx(s.buttons)}>
          <button className={cx(s["pt-button"])} onClick={toggleEditMode}>
            <Text id="client.account.detail.button.edit" defaultMessage="EDIT PROFILE" />
          </button>
        </div>
      </div>
    );
  }
}


export default withStyles(s)(AccountDetail);
