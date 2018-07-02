import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UsersList.css';
import cx from 'classnames';
import avatar from './gfx/avatar.png';
import history from '../history'; 
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import { selectInTable } from '../../../../redux/actions/navigation';

import { connect } from 'react-redux';
import moment from 'moment';

const messages = defineMessages({
  general: {
    id: 'settings.generalSettings.header',
    defaultMessage: 'General',
    description: 'settings.generalSettings.header',
  },
  siteTitle: {
    id: 'settings.generalSettings.field.siteTitle',
    defaultMessage: 'Site title',
    description: 'settings.generalSettings.field.siteTitle',
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
});


class UsersList extends React.Component {

  offset = 400;
  chunkSize = 20;

  constructor(props) {
    super(props);

    this.inspectRoom = this.inspectRoom.bind(this);
    this.onScrollToBottom = this.onScrollToBottom.bind(this);
    this.toggleSortBy = this.toggleSortBy.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      predicate: 'last_login',
      order: true, // false -> asc | true -> desc
      selected: []
    };

    // this.rooms = _.orderBy(props.rooms, [this.state.predicate], [this.state.order]);

  }

  handleDoubleClick() {
    history.push('/chat/1223');
  }

  inspectRoom() {
    this.props.showSidebar();
  }

  onScrollToBottom(e) {

    // if ( e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - this.offset) {
    //   this.setState({inc: this.state.inc++});
    //   this.setState({rooms: [...this.state.rooms, ]})
    // }
    
  }

  select(e, index, itemId) {
    if(e.shiftKey) {
      const users = _.orderBy(this.props.users, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

      let foundIndex = _.findIndex(users, { id: this.props.selectedInTable[this.props.selectedInTable.length-1] }) || 0;
      const selectedItems = (foundIndex > index) ? users.slice(index, foundIndex) : users.slice(foundIndex, index+1);

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

  toggleSortBy(e, predicate) {
    e.preventDefault();

    if (this.state.predicate === predicate) {
      this.setState({ order: !this.state.order })
    } else {
      this.setState({ predicate: predicate })
    }

  }

  onDoubleClick = (e) => {

    e.preventDefault();
    console.log(e);

  }

  render() {
    const users = _.orderBy(this.props.users, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={cx(s.avatar, 'hidden-md-down')}></th>
                  <th className={s.name}>Name</th>
                  <th className={cx(s.user, 'hidden-xs-down')}>Username</th>
                  <th className={cx(s.email)}>Email</th>
                  <th className={cx(s.role)}>Role</th>
                  <th className={cx(s.createdAt, 'hidden-md-down')}>Created At</th>
                  <th className={cx(s.timeago, 'hidden-md-down')}>Last Login</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { users.map((item, index) => {
                  
                    return (
                        <tr key={item.id} onClick={e => this.select(e, index, item.id)} onDoubleClick={this.onDoubleClick} className={cx( (this.props.selectedInTable.indexOf(item.id) !== -1) ? s.selected : null ) }>
                          <td className={cx(s.avatar, 'hidden-md-down')}>
                            <div className={s['table-avatar']}>
                              <img className={s['chat-avatar']} src={avatar} />
                            </div>
                          </td>
                          <td className={cx(s.name)}>{`${item.first_name} ${item.last_name}`}</td>
                          <td className={cx(s.user, 'hidden-xs-down')}>{item.username}</td>
                          <td className={cx(s.email)}>{item.email}</td>
                          <td className={cx(s.role)}>{item.role}</td>
                          <td className={cx(s.createdAt, 'hidden-md-down')}>{moment(item.created_at).format('L')}</td>
                          <td className={cx(s.timeago, 'hidden-md-down')}>{(item.last_login) ? moment(item.last_login).fromNow() : null }</td>
                        </tr>
                    )
                })
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
  selectInTable
}

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(UsersList));