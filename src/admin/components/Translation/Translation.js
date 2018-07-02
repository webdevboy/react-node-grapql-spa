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

import ExternalLink from 'react-feather/dist/icons/external-link';
import MdLanguage from 'react-icons/lib/md/language';

import LanguagesList from './LanguagesList';
import TranslationsList from './TranslationsList';
import SideBarView from './SideBarView';

class Translation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filters: null,
      sidebar: false
    };
  }


  
  handleChange = (ev) => {
    this.setState({search: this.search.value});
  }

  handleSelectFilter = (ev, {key, id}) => {
    this.setState({ filters: { [key]: id } });
  }

  clearFilter = (ev, { key }) => {
    console.log(key);
    this.setState({ 
      filters: _.reduce(this.state.filters, (filter, value, filterKey) => {

        if (filterKey !== key) {
          filter[filterKey] = value
        }
        return filter
      }, {}) 
    });
  }

  deleteLocale = () => {
    const { selectedInTable } = this.props;
    selectedInTable.forEach(id => {
      this.props.removeLanguage({id});
    })
  }

  showSidebar = () => {
    this.props.showSidebar();
  }

  render() {

    const { locale, showChatInspector, locales, predicate } = this.props;
    const { sidebar } = this.state;
    const filtersAvailable = [];

    const actionsAvailable = [
      {
        label: 'Add locale',
        icon: <MdLanguage color="#FFFFFF" size="18" className={'btn-icon'} />,
        class: 'btn-secondary',
        action: this.showSidebar
      },
      {
        label: 'Delete Locale',
        icon: <MdLanguage color="#FFFFFF" size="18" className={'btn-icon'} />,
        action: this.deleteLocale
      }
    ];

    let availableLocales = this.props.availableLocales.filter(locale => {
      let filteredRes = Object.keys(locale.locale).map(key => {
        return _.includes(locale.locale[key] ? locale.locale[key].toLowerCase() : '', this.state.search.toLowerCase());
      })
      return filteredRes.includes(true);
    });

    
    if (this.state.filters) {
      availableLocales = _.filter(availableLocales, this.state.filters);
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
              { locale ? 
                <TranslationsList predicate={predicate} search={this.state.search}/> 
                : 
                <LanguagesList locales={availableLocales} predicate={predicate}/> 
              }
              
            </div>
            <Sidebar show={ showChatInspector }><SideBarView locales={locales}/></Sidebar>
          </div>
          
        </div>


      
    );
  }
}

const mapStateToProps = (state) => ({
  showChatInspector: state.interface.sidebar,
  availableLocales: state.admin.locales,
  selectedInTable: state.interface.tableSelection.selectedInTable || []
});

const mapDispatch = {
  removeLanguage, 
  showSidebar
}

export default connect(mapStateToProps, mapDispatch)(Translation);