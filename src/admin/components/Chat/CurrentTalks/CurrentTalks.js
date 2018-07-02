import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrentTalks.css';
import cx from 'classnames'; 
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import { toggleCurrentTalk } from '../../../../redux/actions/currentTalks';

import avatar from '../gfx/avatar.png';

const messages = defineMessages({
  conversations: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Conversations',
    description: 'currentTalks.container.header',
  },
});


class CurrentTalks extends React.Component {

  constructor() {
    super();
    this.toggleConversationsWidth = this.toggleConversationsWidth.bind(this);
  }

  toggleConversationsWidth(e) {
    e.preventDefault();
    // this.props.toggleCurrentTalk();
    return false;
  }

  render() {

    const { expanded } = this.props;

    return (
      <div className={cx(s['container'], 'conversations', (expanded) ? s.max: s.min)}>
        <div className={s['container-header']}>
          <span className={s['header']}><FormattedMessage {...messages.conversations} /> </span>
        </div>
        <div className={cx('talks-list',s['current-talks'])}>
          {
            [1,2,3,4].map((item, index) => {
              return (<div key={index} className={s['talk']}>
                              <div className={s.user}>
                                <a className={cx(s['talk-avatar'])}
                                style={{backgroundImage: 'url(' + avatar + ') !important' }}></a>
                                <span>Ferreiro</span>
                              </div>
                              <span className={cx(s.count, 'badge', 'badge-pill', 'badge-danger')}>2</span>
                            </div>)
            })
          }
        </div> 
        <div className={"resizable-handle"} draggable onMouseUp={this.toggleConversationsWidth} onDragStart={this.toggleConversationsWidth}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expanded: true,
});

export default connect(mapStateToProps, null)(withStyles(s)(CurrentTalks));
