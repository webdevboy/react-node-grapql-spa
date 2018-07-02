import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./FavouriteAirport.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import MdFlightTakeoff from "react-icons/lib/md/flight-takeoff";
import MoreVertical from "react-feather/dist/icons/more-vertical";

class FavouriteAirport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {  
    const { editMode } = this.state;
    const { toggleOpenedModal } = this.props;

    return (
      <div className={cx(s["favourite-airport"], editMode ? s['edit-mode'] : null)}>
        {!editMode &&
          <div className={s.icon}>
            <MdFlightTakeoff
              className={cx(s["icn"])}
              size={25}
              color="#e2e2e1"
            />
          </div>
        }
        <div className={s.details}>
          <i className={"famfamfam-flags pt"} /> LISBON, PT - LIS, LPPT
        </div>
        <div className={s.distance}>22Km</div>
        {!editMode
          ? <div className={s.controls} onClick={() => this.toggleEditMode()}>
              <MoreVertical color="#e2e2e1" size="28" />
            </div>
          : <div className={s.controls} onClick={() => this.toggleEditMode()}>
              <button className={cx(s.btn, s.edit)}>
                <Text id="client.favourite.airport.btn.edit" defaultMessage="Edit" />
              </button>
              <button className={cx(s.btn, s.delete)} onClick={() => toggleOpenedModal(true, 'delete-airport')}>
                <Text id="client.favourite.airport.btn.delete" defaultMessage="Delete" />
              </button>
            </div>
        }
      </div>
    );
  }
}


export default withStyles(s)(FavouriteAirport);
