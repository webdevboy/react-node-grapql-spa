import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ExternalLink from 'react-feather/dist/icons/external-link';
import { connect } from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import { removeRedirection } from '../../actions/urlManager';
import Sidebar from '../../components/Sidebar';
import UrlsList from './UrlsList';
import SideBarView from './SideBarView';

class Urls extends React.Component {
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
      this.props.removeRedirection({id});
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
        label: 'Create Redirection',
        icon: <ExternalLink color="#FFFFFF" size="18" className={'btn-icon'} />,
        class: 'btn-secondary',
        action: this.showSidebar
      },
      {
        label: 'Delete Redirection',
        icon: <ExternalLink color="#FFFFFF" size="18" className={'btn-icon'} />,
        action: this.deleteRedirection
      }
    ];

    let urls = this.props.urls.filter(url => {
      let filteredRes = Object.keys(url).map(key => {
        return _.includes(url[key] ? url[key].toLowerCase() : '', this.state.search.toLowerCase());
      })
      return filteredRes.includes(true);
    });

    if (this.state.filters) {
      urls = _.filter(urls, this.state.filters);
    }

    return (
      <div className={'wrapper-container'}>
        <div className={'body'}>
          <div>
            <UrlsList urls={urls} setEdit={this.setEdit}/>
          </div>
          <Sidebar show={ showChatInspector }><SideBarView edit={edit} url={urls[selected]}/></Sidebar>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  urls: state.redirections,
});

const mapDispatch = {
  removeRedirection,
};


export default connect(mapStateToProps, mapDispatch)(Urls);
