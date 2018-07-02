import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChatInspector.css';
import cx from 'classnames'; 
import avatar from '../gfx/avatar.png';
import history from 'core/history';
import PlusCircle from 'react-feather/dist/icons/plus-circle'; 
import MoreHorizontal from 'react-feather/dist/icons/more-horizontal'; 
import User from 'react-feather/dist/icons/user'; 
import Shield from 'react-feather/dist/icons/shield'; 
import Package from 'react-feather/dist/icons/package'; 
// import NavItem from '../../../components/NavBar/NavItem';
import * as FileTypesSvg from 'react-extensions-svg';
import { connect } from 'react-redux';
import { find, capitalize } from 'lodash';
import _ from 'lodash';

const messages = defineMessages({
  account: {
    id: 'chatinspector.header.action.account',
    defaultMessage: 'Account',
    description: 'Room Inspector dropdown user account',
  },

  archive: {
    id: 'chatinspector.header.action.archive',
    defaultMessage: 'Archive',
    description: 'Room Inspector dropdown archive conversation',
  },

  block: {
    id: 'chatinspector.header.action.block',
    defaultMessage: 'Block',
    description: 'Room Inspector dropdown block communications',
  },

  openRoom: {
    id: 'chatinspector.actions.openroom',
    defaultMessage: 'Open Conversation',
    description: 'Action on chat inspector to join conversation',
  },

  goBack: {
    id: 'chatinspector.actions.goback',
    defaultMessage: 'Go Back',
    description: 'Return to chat history',
  },

});

const quickActions = [
  {
    to: '/new',
    label: messages.account,
    icon: <User color="#FFFFFF" />,
    class: 'info',
  },
  {
    to: '/new',
    label: messages.archive,
    icon: <Package color="#FFFFFF" />,
  },
  {
    to: '/new',
    label: messages.block,
    icon: <Shield color="#FFFFFF" />,
    class: 'danger'
  }
];

const RenderExtensionIcon = ({ extension }) => {

  const props = {
    color: '#FFFFFF',
    size: '32px'
  };

  return React.createElement(FileTypesSvg[capitalize(extension)], props);

} 

class ChatInspector extends React.Component {
  constructor(props) {
    super(props);
    this.openRoom = this.openRoom.bind(this);
  }

  openRoom(e, id) {
    history.push(`/chat/${id}`)
  }

  goBack() {
    history.goBack()
  }

  render() {

    const { id, rooms, isManager} = this.props;

    const room = _.find(rooms, { id: id });
    // const room = rooms[id];

    return (
      <div className={s.inspector}>
        
        <div className={s['container-header']}>
          <div className={s['table-avatar']}>
            { /* <div className={s['chat-color']} style={{backgroundColor: room.color || 'grey'}}></div> */ }
            <img className={s['chat-avatar']} src={avatar}/>
          </div>
          <div className={s.username}>
            <h3>{(room.customer) ? room.customer.first_name + ' ' + room.customer.last_name : null}</h3>
            { /* <span>{room.customer.username}</span>*/ }
          </div>
          <div className={cx(s.actions, 'dropdown')}>

            <a className={cx('dropdown-toggle', 'no-caret')} id='room-actions' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <MoreHorizontal color="#FFFFFF" />
            </a>

            <ul className={cx('dropdown-menu', 'dropdown-menu-right')} aria-labelledby='room-actions'>

              <li className={"dropdown-header"}>Room Actions</li>
              { quickActions.map((item, index) => <li className={'dropdown-item'} key={index}><a href={item.to} className={item.class}>{item.icon}<FormattedMessage {...item.label} /></a></li>) }
            </ul>

          </div>
        </div>

        <div className={s['container-content']}>

          <div className={s['info']}>
            <div className={s['info-line']}>
              <label>Email</label>
              <span>{ (room.customer) ? room.customer.email : null }</span>
            </div>
            <div className={s['info-line']}>
              <label>Phone</label>
              <span>3102918223</span>
            </div> 
            <div className={s['info-line']}> 
              <label>Location</label>
              <span>
                { /*
                  <span className={cx(s.flag, 'famfamfam-flags', room.country.toLowerCase())}></span>
                  <span>
                    {room.location}
                  </span>
                  */
                }
              </span>
            </div>
            <div className={s['info-line']}>
              <label>UUID</label>
              <span>76ASDAG6D7AS6KJJAOI099ALKAS</span>
            </div>
          </div>

          <div className={s['notes']}>
            
            <div className={s['info-line']}>
              <label>Notes</label>
              <span>{ (this.props.notes && this.props.notes.length) ? this.props.notes.length : 'Theres no notes yet' }</span>
            </div>

            <div className={cx("input-group")}>
              <input type="text" className={"form-control"} placeholder="Add notes here" aria-describedby="addnote" />
              <span className="input-group-addon" id="addnote">
                <PlusCircle color="#FFFFFF" />
              </span>
            </div>
          </div>

          <div className={s['attachments']}>

            <div className={s['info-line']}>
              <label>Attachments</label>
              <span>{ (this.props.attachments && this.props.attachments.length) ? this.props.attachments.length : 'No attachments yet' }</span>
            </div>

            <div className={s['attachments-list']}>
              
              <div className={s['attachment-item']}>
                <div className={s['extension-item']}>
                  <RenderExtensionIcon extension='mp3' />
                </div>
                <label className={s['size-item']}>1.83(Mb)</label>
                <span className={s['date-item']}>28 Feb, 2017</span>
              </div>
            
            </div>
          </div>
        </div>

        <div className={s['container-action']}>
          {
            (isManager) ? <button className={cx('btn','btn-primary', 'btn-block')} onClick={(e) => this.openRoom(e, room.id)}><FormattedMessage {...messages.openRoom} /></button> : <button className={cx('btn','btn-primary', 'btn-block')} onClick={this.goBack}><FormattedMessage {...messages.goBack} /></button>
          }
        </div> 

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rooms: state.chat.rooms,
});

export default connect(mapStateToProps, null)(withStyles(s)(ChatInspector));
