import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChatMessage.css';
import cx from 'classnames'; 
import avatar from '../../gfx/avatar.png';
import _ from 'lodash';
import moment from 'moment';

const messages = defineMessages({
  currentTalks: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
});


class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { attachments, message } = this.props;
    // const attachments = _.times(attachments);

    return (
      <div className={cx(s['container'], (this.props.owner === 'customer' ? s['left'] : s['right']))}>
        
        <div className={s.content}>

          {
             (message.user && message.user.avatar_path) ? <div className={s['avatar']}><img src={message.user.avatar_path}/></div> : null 
          }
          
          <div className={s['message']}>
            <div className={s['corpus']}>{message.body}</div>
            <div className={s['attachments']}>
              
            </div>
          </div>

        </div>

        <div className={s['time-ago']}>
          <span>
            { moment(message.created_at).fromNow() }
          </span>
        </div>

      </div>

    );
  }
}

export default withStyles(s)(ChatMessage);
