import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LanguagesList.css';
import cx from 'classnames';
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import { selectInTable } from '../../../../redux/actions/navigation';
import { setLanguageEnabled } from '../../../../redux/actions/admin';
import CheckBox from '../../Checkbox'; 
import history from '../history';

import { connect } from 'react-redux';
import moment from 'moment';

const messages = defineMessages({
  redirectionTo: {
    id: 'urlManager.table.redirectionTo',
    defaultMessage: 'Redirection To',
    description: 'urlManager.table.redirectionTo',
  },
  redirectionFrom: {
    id: 'urlManager.table.redirectionFrom',
    defaultMessage: 'Redirection From',
    description: 'urlManager.table.redirectionFrom'
  },
  save: {
    id: 'actions.save',
    defaultMessage: 'Save',
    description: 'actions.save',
  },
});


class LanguagesList extends React.Component {

  offset = 400;
  chunkSize = 20;

  constructor(props) {
    super(props);
    this.state = {
      predicate: 'last_login',
      order: true, // false -> asc | true -> desc
      selected: []
    };

    // this.rooms = _.orderBy(props.rooms, [this.state.predicate], [this.state.order]);

  }

  inspectRoom = () => {
    this.props.showSidebar();
  }


  select(e, index, itemId) {
    if(e.shiftKey) {
      const { locales } = this.props;

      let foundIndex = _.findIndex(locales, { id: this.props.selectedInTable[this.props.selectedInTable.length-1] }) || 0;
      const selectedItems = (foundIndex > index) ? locales.slice(index, foundIndex) : locales.slice(foundIndex, index+1);

      const ids = selectedItems.map(item => {
        return item.id
      });

      this.props.selectInTable({ selectedInTable: [...this.props.selectedInTable, ...ids] })
    } else if (e.metaKey) { 
      this.props.selectInTable({ selectedInTable: [...this.props.selectedInTable, itemId] })
    } else {
      this.props.selectInTable({ selectedInTable: [itemId] });
    }
  }

  toggleSortBy = (e, predicate) => {
    e.preventDefault();

    if (this.state.predicate === predicate) {
      this.setState({ order: !this.state.order })
    } else {
      this.setState({ predicate: predicate })
    }

  }

  onDoubleClick = (e, locale) => {
    const { predicate } = this.props;
    e.preventDefault();
    const url = predicate == 'client.' ? `/translations/${locale}` : `/admin-translations/${locale}`;
    history.push(url);
  }

  enableLocale = (ev, id) => {
    ev.stopPropagation();
    this.props.setLanguageEnabled(id);
  }

  render() {
    const { locales } = this.props;
    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Locale</th>
                  <th>Enabled</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { locales.map((item, index) => (
                    <tr key={index} onClick={e => this.select(e, index, item.id)} onDoubleClick={(ev) => this.onDoubleClick(ev, item.locale.locale)} className={cx( (this.props.selectedInTable.indexOf(item.id) !== -1) ? s.selected : null ) }>
                      <td>{item.locale.language}</td>
                      <td>{item.locale.locale}</td>
                      <td><CheckBox checked={item.enabled} for={item.locale.language} onChange={(ev) => this.enableLocale(ev,item.id)}/></td>
                    </tr>
                  ))
                }
                <tr>
                    
                </tr>
              </tbody>
          </table>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  selectedInTable: state.interface.tableSelection.selectedInTable || []
})

const mapDispatch = {
  showSidebar,
  setLanguageEnabled,
  selectInTable
}

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(LanguagesList));
