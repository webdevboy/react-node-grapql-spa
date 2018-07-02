import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './filters.css';
import cx from 'classnames'; 
import SearchIcon from 'react-feather/dist/icons/search';
import Filter from 'react-feather/dist/icons/filter';
import { capitalize, findIndex } from 'lodash';
// import LanguageSwitcher from '../LanguageSwitcher';

const messages = defineMessages({
  hidefilters: {
    id: 'filters.hide',
    defaultMessage: 'Hide filters',
    description: 'filters.hide',
  },
  showfilters: {
    id: 'filters.show',
    defaultMessage: 'Show filters',
    description: 'filters.show',
  },
  siteDescription: {
    id: 'settings.generalSettings.field.siteDescription',
    defaultMessage: 'Description',
    description: 'settings.generalSettings.field.siteDescription',
  },
  siteDefaultEmail: {
    id: 'settings.generalSettings.field.siteDefaultEmail',
    defaultMessage: 'Default email',
    description: 'settings.generalSettings.field.siteDefaultEmail',
  },
  save: {
    id: 'actions.save',
    defaultMessage: 'Save',
    description: 'actions.save',
  },
  all: {
    id: 'filters.all',
    defaultMessage: 'All',
    descriptions: 'dropdown default for all'
  }
});

const ActionListing = ({ actions }) => {

  if (actions) {
    return <div className={s.actions}>
            { actions.map((action, index) => 
              <button 
                onClick={action.action}
                key={'action-btn-'+index}
                className={cx('btn', (action.class) ? action.class : 'btn-primary')}>
              {(action.icon) ? action.icon : null }<span>{action.label}</span></button>
            )}
          </div>
  }

  return null

}

const ViewPreset = ({ viewPreset }) => {
  if (viewPreset) {
    return (<div className={s.viewPreset}>
            { viewPreset.map((preset, index) => 
              <span onClick={preset.action} key={index} className={cx((preset.view == preset.viewTarget) ? s['preset-active'] : '')}>
                {preset.icon ? preset.icon : null}
              </span>
            )}
          </div>)
  }

  return null

}

// const LanguageSwitching = ({action}) => {
//   if(action){
//     return <LanguageSwitcher onChange={action.onChange}/>
//   }
//   return null;
// }

class Filters extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      status: false,
    };

    this.toggleFilters = this.toggleFilters.bind(this);
  }

  toggleFilters() {
    this.setState({status: !this.state.status});
  }
  
  render() {
    const { actions, filters, viewPreset, searchInput, handleChange, activeFilters, onSelectFilter, clearFilter, intl, languageSwitcher } = this.props;

    return (
      <div className={cx(s.filters, (this.state.status) ? s.show : '' )}>

        <div className={cx(s.left)}>
          {/* <LanguageSwitching action={languageSwitcher}/> */}
          {
            filters.map(filter => {

              let label = filter.label;

              if (activeFilters && activeFilters[filter.key]) {
                console.log(filter.options[findIndex(filter.options, { id: activeFilters[filter.key] })]);
                label = filter.options[findIndex(filter.options, { id: activeFilters[filter.key] })].name
              }
            
              return (<div key={filter.label} className={cx('dropdown', s.dropdown)}>
                <button className={"btn dropdown-toggle"} type="button" id={filter.label} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span>{ capitalize(label) }</span>
                </button>
                <ul className={"dropdown-menu"} aria-labelledby={filter.label}>
                  <li className={"dropdown-header"}>{capitalize(filter.label)}</li>
                  <li className="dropdown-item" onClick={ev => clearFilter(ev, {key: filter.key})} key="all"><a href="#"><FormattedMessage {...messages.all} /></a></li>
                  {
                    filter.options.map((opts, index) => <li className={"dropdown-item"} onClick={ev => onSelectFilter(ev, {key: filter.key, id: opts.id})} key={index}><a href="#">{opts.name}</a></li>)
                  }
                </ul>
              </div>);
              
            })
          }
        </div>

        <div className={s.right}>

          <button className={s.filterbutton} onClick={this.toggleFilters} type="button" title="Toggle navigation">
            <Filter color="#FFFFFF" />
          </button>

          <div className={s.search}>
            <div className={cx("input-group")}>
              <input type="text" className={"form-control"} ref={searchInput} onChange={handleChange} placeholder="Search" aria-describedby="search" />
              <span className="input-group-addon" id="search"><SearchIcon /></span>
            </div>  
          </div> 

          <ActionListing actions={actions} />
          <ViewPreset viewPreset={viewPreset} />
        </div>


      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Filters));


/**
 *
 *
 *
 *
 *
 *
 *
 * <div className={cx('dropdown', s.dropdown)}>
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


 *   <select className={s['fieldInput']}>
               <option>All</option>
               <option>None</option>
            </select>
            <select className={s['fieldInput']}>
               <option>Registered</option>
               <option>None</option>
            </select>
            <select className={s['fieldInput']}>
               <option>Device</option>
               <option>None</option>
            </select>
            <div className={s['filler']}></div>
            <input type='text' className={cx(s['fieldInput'],s['fieldSearch'])} placeholder='Search' onChange={this.handleChange}/>
*/