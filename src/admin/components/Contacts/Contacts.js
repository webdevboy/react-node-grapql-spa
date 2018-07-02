import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Actions from '../../components/actions';
import Filters from '../../components/filters';

import { connect } from 'react-redux';
import { createUser, removeUser } from '../../../redux/actions/user';
import { showSidebar } from '../../../redux/actions/sidebar';
import { removeOffice } from '../../../redux/actions/offices';

import _ from 'lodash';
import cx from 'classnames';
import Sidebar from '../../components/Sidebar';
import TiContacts from 'react-icons/lib/ti/contacts';
import ContactsList from './ContactsList';
import SideBarView from './SideBarView';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filters: null,
    };
  }
  
  handleChange = (ev) => {
    this.setState({search: this.search.value});
  }

  handleSelectFilter = (ev, {key, id}) => {
    this.setState({ filters: { [key]: id } });
  }

  clearFilter = (ev, { key }) => {
    this.setState({ 
      filters: _.reduce(this.state.filters, (filter, value, filterKey) => {

        if (filterKey !== key) {
          filter[filterKey] = value
        }
        return filter
      }, {}) 
    });
  }

  deleteOffice = () => {
    const { selectedInTable } = this.props;

    selectedInTable.forEach(id => {
      this.props.removeOffice({id});
    })
  }

  setEdit = (bool, id) => {
    this.setState({edit: bool, selected: id})
  }

  showSidebar = () => {
    const { showSidebar } = this.props;
    this.setState({edit: false}, () => {showSidebar()});
  }

  render() {

    const { showChatInspector } = this.props;
    const { edit=false, selected=-1 } = this.state;
    const filtersAvailable = [
     
    ];

    const actionsAvailable = [
      {
        label: 'Create contact',
        icon: <TiContacts color="#FFFFFF" size="18" className={'btn-icon'} />,
        class: 'btn-secondary',
        action: this.showSidebar
      },
      {
        label: 'Delete contact',
        icon: <TiContacts color="#FFFFFF" size="18" className={'btn-icon'} />,
        action: this.deleteOffice
      }
    ];


    let offices = this.props.offices.filter(office => {
      let filteredRes = Object.keys(office).map(key => {
        return _.includes(typeof office[key] === 'string' ? office[key].toLowerCase() : '', this.state.search.toLowerCase());
      })
      return filteredRes.includes(true);
    });

    
    if (this.state.filters) {
      offices = _.filter(offices, this.state.filters);
    }
    
    return (
        <div className={'wrapper-container'}>
          <div className={'body'}>
            <div>
              <Filters 
                searchInput={el => this.search = el} 
                handleChange={this.handleChange} 
                filters={filtersAvailable} 
                actions={actionsAvailable}
                clearFilter={this.clearFilter} 
                activeFilters={this.state.filters} 
                onSelectFilter={this.handleSelectFilter}
               />
              <ContactsList offices={offices} setEdit={this.setEdit}/>
            </div>
            <Sidebar show={ showChatInspector }><SideBarView edit={edit} office={offices[selected]}/></Sidebar>
          </div>
          
        </div>


      
    );
  }
}


const mapStateToProps = (state) => ({
  showChatInspector: state.interface.sidebar,
  selectedInTable: state.interface.tableSelection.selectedInTable || [],
  offices: state.offices.offices
});

export default connect(mapStateToProps, { removeOffice, showSidebar })(Contacts);
