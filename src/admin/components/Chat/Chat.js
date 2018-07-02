import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Chat.css";
// import Filters from "../filters";
// import Sidebar from "../Sidebar";
import _ from "lodash";
import { connect } from "react-redux";
import cx from "classnames";
import ChatInspector from "./ChatInspector";
import CurrentTalks from "./CurrentTalks";
import ChatHistory from "./ChatHistory";
import ChatRoom from "./ChatRoom";
// import { subscribeNewChatRooms } from '../../../redux/actions/chat';

/* <div className={cx('dropdown', s.dropdown)}>
            <button className={"btn dropdown-toggle"} type="button" id="filter2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>User</span>
            </button>
            <ul className={"dropdown-menu"} aria-labelledby="filter2">
              <li className={"dropdown-header"}>Type of User</li>
              <li className={"dropdown-item"}><a href="#">All</a></li>
              <li className={"dropdown-item"}><a href="#">Registered</a></li>
              <li className={"dropdown-item"}><a href="#">Unregistered</a></li>
            </ul>
          </div>

          <div className={cx('dropdown', s.dropdown)}>
            <button className={"btn dropdown-toggle"} type="button" id="filter3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>Color</span>
            </button>
            <ul className={"dropdown-menu"} aria-labelledby="filter3">
              <li className={"dropdown-header"}>Color</li>
              <li className={"dropdown-item"}><a href="#">All</a></li>
              <li className={"dropdown-item"}><a href="#">Registered</a></li>
              <li className={"dropdown-item"}><a href="#">Annonymous</a></li>
            </ul>   
          </div>


          <div className={cx('dropdown', s.dropdown)}>
            <button className={"btn dropdown-toggle"} type="button" id="filter4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>Device</span>
            </button>
            <ul className={"dropdown-menu"} aria-labelledby="filter4">
              <li className={"dropdown-item"}><a href="#">Mobile</a></li>
              <li className={"dropdown-item"}><a href="#">Browser</a></li>
              <li className={"dropdown-divider"}></li>
              <li className={"dropdown-item"}><a href="#">iOS</a></li>
              <li className={"dropdown-item"}><a href="#">Android</a></li>
            </ul>
          </div>
          
          
          <Filters searchInput={el => this.search = el} handleChange={handleChange} filters={filters} clearFilter={clearFilter} activeFilters={activeFilters} onSelectFilter={onSelectFilter} />
          
          */

const ChatManager = ({ rooms, filters, handleChange, clearFilter, activeFilters, onSelectFilter }) => (
  <div className={s["body-wrapper"]}>
    
    <ChatHistory rooms={rooms} />
  </div>
);

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filters: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectFilter = this.handleSelectFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  handleChange(ev) {
    this.setState({ search: this.search.value });
  }

  handleSelectFilter(ev, { key, id }) {
    this.setState({ filters: { [key]: id } });
  }


  clearFilter(ev, { key }) {
    this.setState({
      filters: _.reduce(this.state.filters, (filter, value, filterKey) => {
        if (filterKey !== key) {
          filter[filterKey] = value;
        }
        return filter;
      }, {}),
    });
  }

  render() {
    const { isManager, showChatInspector, selectedRoomId, rooms, room } = this.props;

    const filtersAvailable = [
      // {
      //   label: 'role',
      //   key: 'roleId',
      //   options: roles,
      //   type: 'dropdown'
      // }
    ];

    return (
      <div className={"wrapper-container"}>

        <CurrentTalks />

        <div className={"body"}>
          { (isManager) ?
            <ChatManager
              rooms={rooms}
              handleChange={this.handleChange}
              filters={filtersAvailable}
              activeFilters={this.state.filters}
              clearFilter={this.clearFilter}
              onSelectFilter={this.handleSelectFilter}
            />
            :
            <ChatRoom currentRoute={this.props.currentRoute} id={room.id} conversation={room.messages} />
          }
        </div>


        

      </div>
    );
  }
}

/**
 * 
 * 
 * <Sidebar className={cx((isManager) ? "manager-sidebar" : "room-sidebar")} fixed={!(isManager)} show={showChatInspector}>
          {
            (isManager && selectedRoomId) ? <ChatInspector id={selectedRoomId} isManager={isManager} /> : null
          }
          {
            (!isManager && room.id) ? <ChatInspector id={room.id} isManager={isManager} /> : null
          }
        </Sidebar>
*/

const mapStateToProps = state => ({
  rooms: [],
  selectedRoomId: null,
});

export default connect(mapStateToProps, { })(withStyles(s)(Chat));

