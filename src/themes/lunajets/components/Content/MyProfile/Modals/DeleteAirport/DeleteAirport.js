import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./DeleteAirport.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';

class DeleteAirport extends React.Component {
  render() {  
    const { toggleOpenedModal } = this.props;
    return (
      <div className={cx(s["saved-root"])}>
        <h1 className={s.title}>
          <Text id="client.modal.delete.airport.title" defaultMessage="DELETE AIRPORT" />
        </h1>

        <div className={s.desc}>
          <Text id="client.modal.delete.airport.desc" defaultMessage="Are you sure you want to delete this airport?" />
        </div>

        <div className={cx(s.buttons)}>
          <button className={cx(s.btn, s["pt-button"])} onClick={() => toggleOpenedModal(false, '')}>
            <Text id="client.modal.button.yes" defaultMessage="YES" />
          </button>
          <button className={cx(s.btn, s["ct-button"])} onClick={() => toggleOpenedModal(false, '')}>
            <Text id="client.modal.button.cancel" defaultMessage="CANCEL" />
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DeleteAirport);
