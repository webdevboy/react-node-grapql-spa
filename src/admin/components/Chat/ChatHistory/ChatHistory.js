import React from 'react';
import PropTypes from 'prop-types';

import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChatHistory.css';
import cx from 'classnames';
import avatar from '../gfx/avatar.png';
import history from 'core/history'; 
import _ from 'lodash';
import { selectRoom, addRoom } from 'admin/actions/chat';
import { connect } from 'react-redux';
import moment from 'moment';
import gql from 'graphql-tag';

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


class ChatHistory extends React.Component {
  static contextTypes = { client: PropTypes.object.isRequired };
  offset = 400;
  chunkSize = 20;

  constructor(props) {
    super(props);

    this.inspectRoom = this.inspectRoom.bind(this);
    // this.onScrollToBottom = this.onScrollToBottom.bind(this);
    this.toggleSortBy = this.toggleSortBy.bind(this);
    this.openRoom = this.openRoom.bind(this);
    this.timeoutID = null;
    this.delay = 250;
    this.state = {
      predicate: 'timeago',
      order: true, // false -> asc | true -> desc
    };

    // this.rooms = _.orderBy(props.rooms, [this.state.predicate], [this.state.order]);

  }

  openRoom(id) {
    history.push(`/chat/${id}`);
  }

  inspectRoom(id) {
    this.props.selectRoom(id);
  }

  toggleSortBy(e, predicate) {
    e.preventDefault();

    if (this.state.predicate === predicate) {
      this.setState({ order: !this.state.order })
    } else {
      this.setState({ predicate: predicate })
    }

  }

  componentDidMount() {

    console.log(this.context);
    console.log(this.props);
    this.subscribe();
  }

  subscribe(){
    const { client } = this.context;
    const { addRoom } = this.props;

    this.subscriptionObserver = client.subscribe({
      query: gql`
        subscription {
            newRoom {
              id
              blocked
              archived
              color
              total_messages
              last_message {
                body
                created_at
              }
              customer {
                sfid
                email
                first_name
                last_name
                phone
                type__c
                account_id
              }
            }
          }
      `,
    }).subscribe({
      next(data) {
        addRoom(data.newRoom);
      },
      error(err) { console.error('err', err); },
    });
  }

  handleClick(e, id) {

    if (!this.timeoutID) {
        this.timeoutID = setTimeout(() => {
            this.inspectRoom(id)
            this.timeoutID = null
        }, this.delay);
    } else {
        this.timeoutID = clearTimeout(this.timeoutID);
        this.openRoom(id)
    }

  }

  render() {

    const rooms = _.orderBy(this.props.rooms, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

    return (
      <div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={s.color}></th>
                  <th className={s.avatar}></th>
                  <th className={cx(s.user, 'hidden-xs-down')}>Name</th>
                  <th className={cx(s.lastmsg)}>Last Message</th>
                  <th className={cx(s.count, 'hidden-lg-down')}>Total Messages</th>
                  <th className={cx(s.country, 'hidden-sm-down')}>Location</th>
                  <th className={cx(s.device, 'hidden-sm-down')}>Device</th>
                  <th onClick={(e) => this.toggleSortBy(e, 'timeago')} className={cx(s.timeago, 'hidden-xs-down', s.clickable, (this.state.predicate === 'timeago') ? s.current : '',(this.state.predicate === 'timeago' && this.state.order) ? s.desc : s.asc)}><span>Time</span></th>
                </tr>
              </thead>
              <tbody>

                { rooms.map((room) => {
                    
                    if (room.total_messages) {
                      return (
                        <tr key={room.id} onClick={(e) => this.handleClick(e, room.id)}>
                          <td className={s.color}>
                            <div className={s['chat-color']} style={{backgroundColor: room.color || 'grey' }}></div>
                          </td>
                          <td className={s.avatar}>
                            <div className={s['table-avatar']}>
                              <img className={s['chat-avatar']} src={avatar} />
                            </div>
                          </td>
                          <td className={cx(s.user, 'hidden-xs-down')}>{ (room.customer) ? `${room.customer.first_name} ${room.customer.last_name}` : null }</td>
                          <td className={cx(s.lastmsg)}>
                              { room.last_message.body }
                          </td>
                          <td className={cx(s.count, 'hidden-lg-down')}>{ room.total_messages }</td>
                          <td className={cx(s.country, 'hidden-sm-down')}>
                            <div className={cx('famfamfam-flags')}></div>
                            <span>
                              {
                                // room[roomId].location
                              }
                            </span>
                          </td>
                          <td className={cx(s.device, 'hidden-sm-down')}>Android</td>
                          <td className={cx(s.timeago, 'hidden-xs-down')}>{ (room.last_message.created_at) ? moment(room.last_message.created_at).fromNow() : null }</td>
                        </tr>
                      )
                    } else {
                      return null
                    }
                    
                })
              }
                <tr>
                    
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   rooms: state.chat.rooms,
// });

export default connect(null, { selectRoom, addRoom })(withStyles(s)(ChatHistory));