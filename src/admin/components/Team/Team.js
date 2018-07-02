import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import cx from 'classnames';

import { connect } from 'react-redux';
import { removeLanguage } from '../../../redux/actions/admin';
import { showSidebar } from '../../../redux/actions/sidebar';



import Sidebar from '../../components/Sidebar';
import Actions from '../../components/actions';
import Filters from '../../components/filters';

// import ExternalLink from 'react-feather/dist/icons/external-link';
import MdCardMembership from 'react-icons/lib/md/card-membership';
import UserPlus from 'react-feather/dist/icons/user-plus';
import UserMinus from 'react-feather/dist/icons/user-minus';

import DepartmentList from './DepartmentList';
import TeamList from './TeamList';
import SideBarView from './SideBarView';
import { removeTeam } from '../../../redux/actions/team';

class Team extends React.Component {
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

  deleteRedirection = () => {
    const { selectedInTable } = this.props;

    selectedInTable.forEach(id => {
      this.props.removeTeam({id});
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

    const { department, showChatInspector } = this.props;
    const { edit=false, selected=-1 } = this.state;
    const filtersAvailable = [];

    const actionsAvailable = department ? 
      [
        {
          label: 'Add member',
          icon: <UserPlus color="#FFFFFF" size="18" className={'btn-icon'} />,
          class: 'btn-secondary',
          action: this.showSidebar
        },
        {
          label: 'Delete member',
          icon: <UserMinus color="#FFFFFF" size="18" className={'btn-icon'} />,
          action: this.deleteTeam
        }
      ]
    :  
    [
      {
        label: 'Add department',
        icon: <MdCardMembership color="#FFFFFF" size="18" className={'btn-icon'} />,
        class: 'btn-secondary',
        action: this.showSidebar
      },
      {
        label: 'Delete department',
        icon: <MdCardMembership color="#FFFFFF" size="18" className={'btn-icon'} />,
        action: this.deleteLocale
      }
    ];

    let teams = this.props.teams.filter(team => {
      let filteredRes = Object.keys(team).map(key => {
        return _.includes(typeof team[key] === 'string' ? team[key].toLowerCase() : '', this.state.search.toLowerCase());
      })
      return filteredRes.includes(true);
    });

    if (this.state.filters) {
      teams = _.filter(teams, this.state.filters);
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
             
              { department ? 
                <TeamList department={department} setEdit={this.setEdit}/>
                : 
                <DepartmentList teams={teams} setEdit={this.setEdit}/> 
              }
            </div>
            <Sidebar show={ showChatInspector }><SideBarView department={department} edit={edit} team={teams[selected]}/></Sidebar>
          </div>
          
        </div>


      
    );
  }
}

const mapStateToProps = (state) => ({
  showChatInspector: state.interface.sidebar,
  teams: state.teams.teams,
  selectedInTable: state.interface.tableSelection.selectedInTable || [],
});

const mapDispatch = {
  removeTeam, 
  showSidebar
};

export default connect(mapStateToProps, mapDispatch)(Team);