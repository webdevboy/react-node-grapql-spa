import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Actions from '../../components/actions';
import Filters from '../../components/filters';
// import Inspector from '../../../components/inspector';
// import InspectorView from './inspectorView';
// import InspectorViewUser from './inspectorViewUser';
import { connect } from 'react-redux';
import { createUser, removeUser } from '../../../redux/actions/user';
import _ from 'lodash';
import cx from 'classnames';
import Sidebar from '../../components/Sidebar';
import UserPlus from 'react-feather/dist/icons/user-plus';
import UserMinus from 'react-feather/dist/icons/user-minus';
import UsersList from './UsersList';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filters: null
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

  deleteUser = () => {
    const { selectedInTable } = this.props;

    selectedInTable.forEach(id => {
      this.props.removeUser({id});
    })
  }

  render() {

    const { roles } = this.props;

    const filtersAvailable = [
      {
        label: 'role',
        key: 'roleId',
        options: roles,
        type: 'dropdown'
      }
    ];

    const actionsAvailable = [
      {
        label: 'Create User',
        icon: <UserPlus color="#FFFFFF" size="18" className={'btn-icon'} />,
        class: 'btn-secondary'
        // action: 
      },
      {
        label: 'Delete Users',
        icon: <UserMinus color="#FFFFFF" size="18" className={'btn-icon'} />,
        action: this.deleteUser
      }
    ];

    let users = this.props.users.filter(user => {
      let filteredRes = Object.keys(user).map(key => {
        return _.includes(user[key] ? user[key].toLowerCase() : '', this.state.search.toLowerCase());
      })
      return filteredRes.includes(true);
    });

    
    if (this.state.filters) {
      users = _.filter(users, this.state.filters);
    }

    return (

        <div className={'wrapper-container'}>
          <div className={'body'}>
            <div>
              <Filters 
                searchInput={el => this.search = el} 
                handleChange = {this.handleChange} 
                filters={filtersAvailable} 
                actions={actionsAvailable}
                clearFilter={this.clearFilter} 
                activeFilters={this.state.filters} 
                onSelectFilter={this.handleSelectFilter}
               />
              <UsersList users={users} />
            </div>
          </div>
          
        </div>


      
    );
  }
}


const mapStateToProps = (state) => ({
  selectedInTable: state.interface.tableSelection.selectedInTable || []
});

const mapDispatch = {
  createUser,
  removeUser 
}

export default connect(mapStateToProps, mapDispatch)(Users);


