import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import * as _ from 'lodash';
import s from "./FavouriteAirports.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import SearchIcon from 'react-feather/dist/icons/search';
import FavouriteAirport from './FavouriteAirport';
import FavouriteAirportList from 'themes/lunajets/components/Content/MyProfile/FavouriteAirports/FavouriteAirportList/FavouriteAirportList';
class FavouriteAirports extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      filtering: false,
      filterText: '',
      openedModal: false
    }   
  }

  handleChange(e) {
    if(e.target.value){      
      this.setState({filtering: true, filterText: e.target.value});
    }
    else{
      this.setState({filtering: false});
    }
  }

  render() {
    const { filtering, filterText, openedModal } = this.state;   
    const { toggleOpenedModal } = this.props; 
    return (
      <div className={cx(s["favourite-airports-root"])}>        
        <h1 className={s.title}>
          <Text id="client.favourite.airports.title" defaultMessage="Favourite airports" />
        </h1>
        <div className={s.search}>
          <div className={cx("input-group")}>
            {/* <input type="text" className={"form-control"} ref={searchInput} onChange={this.handleChange} placeholder="Search" aria-describedby="search" /> */}
            <input type="text" onChange={this.handleChange} placeholder="Enter a city or an airport" aria-describedby="search" />
            <span className={cx(s["search-icon"])} id="search"><SearchIcon size={18}/></span>
          </div>  
        </div>
        {
          filtering && 
          <FavouriteAirportList filterText={filterText}/>
        }
        {
          !filtering && 
          <div className={cx("input-group mt-2", s.buttons)}>
            <button className={cx(s["pt-button"])}  onClick={() => toggleOpenedModal(true, 'added-airport')}>
              <Text id="client.favourite.airports.button.add" defaultMessage="ADD AIRPORT" />
            </button>
          </div>
        }
        {
          !filtering && 
          <div className={s["airport-list"]}>
            <FavouriteAirport toggleOpenedModal={toggleOpenedModal}/>
          </div>
        }        
      </div>
    );
  }
}


export default withStyles(s)(FavouriteAirports);
