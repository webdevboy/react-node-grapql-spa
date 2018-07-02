import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ArticlesList.css';
import cx from 'classnames';
import avatar from './gfx/avatar.png';
import history from 'core/history'; 
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import { selectArticle } from '../../../../redux/actions/articles';

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


class ArticlesList extends React.Component {

  offset = 400;
  chunkSize = 20;

  constructor(props) {
    super(props);

    this.inspectRoom = this.inspectRoom.bind(this);
    this.onScrollToBottom = this.onScrollToBottom.bind(this);
    this.toggleSortBy = this.toggleSortBy.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      predicate: 'date',
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
    console.log(e.metaKey);

    if(e.shiftKey) {
      const articles = _.orderBy(this.props.articles, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

      let foundIndex = _.findIndex(articles, { id: this.props.selectedArticles[this.props.selectedArticles.length-1] }) || 0;
      console.log(foundIndex, index);      
      const selectedItems = (foundIndex > index) ? articles.slice(index, foundIndex) : articles.slice(foundIndex, index+1);

      const ids = selectedItems.map(item => {
        return item.id
      });

      this.props.selectArticle({ selectedArticles: [...this.props.selectedArticles, ...ids] })
    } else if (e.metaKey) { 
      this.props.selectArticle({ selectedArticles: [...this.props.selectedArticles, itemId] })
    } else {
      this.props.selectArticle({ selectedArticles: [itemId] });
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
    const articles = _.orderBy(this.props.articles, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

    return (
      <div className={s['main-container']}>
        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={s.name}>Title</th>
                  <th className={cx(s.author, 'hidden-xs-down')}>Author</th>
                  <th className={cx(s.category)}>Category</th>
                  <th className={cx(s.date)}>Date</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { articles.map((article, index) => {
                  
                    return (
                        <tr key={article.id} onClick={e => this.select(e, index, article.id)} onDoubleClick={this.onDoubleClick} >
                          <td className={cx(s.name)}>{article.title}</td>
                          <td className={cx(s.user, 'hidden-xs-down')}>{article.author.first_name + ' ' + article.author.last_name}</td>
                          <td className={cx(s.category)}>{article.category.name}</td>
                          <td className={cx(s.timeago, 'hidden-md-down')}>{moment(article.date).calendar() }</td>
                        </tr>
                    )
                })
              }
                <tr>
                    
                </tr>
              </tbody>
          </table>
        </div>
        <div> Total : &nbsp;&nbsp; {articles.length} </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  selectedArticles: state.articles.selectedArticles
})

export default connect(mapStateToProps, { showSidebar, selectArticle })(withStyles(s)(ArticlesList));

/*
 className={cx( (this.props.selectedArticle.indexOf(article) !== -1) ? s.selected : null ) }


<img className={s['chat-avatar']} src={item.avatar} />





                    <th onClick={(e) => this.toggleSortBy(e, 'timeago')} className={cx(s.timeago, 'hidden-xs-down', s.clickable, (this.state.predicate === 'timeago') ? s.current : '',(this.state.predicate === 'timeago' && this.state.order) ? s.desc : s.asc)}><span>Time</span></th>

<div className={s['chat-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={s.color}></th>
                  <th className={s.avatar}></th>
                  <th className={cx(s.user, 'hidden-xs-down')}>Username</th>
                  <th className={cx(s.lastmsg)}>Last Message</th>
                  <th  className={cx(s.count, 'hidden-lg-down')}>Total Messages</th>
                  <th className={cx(s.country, 'hidden-sm-down')}>Location</th>
                  <th className={cx(s.device, 'hidden-sm-down')}>Device</th>
                  <th onClick={(e) => this.toggleSortBy(e, 'timeago')} className={cx(s.timeago, 'hidden-xs-down', s.clickable, (this.state.predicate === 'timeago') ? s.current : '',(this.state.predicate === 'timeago' && this.state.order) ? s.desc : s.asc)}><span>Time</span></th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { rooms.map((item, index) => {
                  
                    return (
                        <tr key={index} onClick={this.inspectRoom} onDoubleClick={this.handleDoubleClick}>
                          <td className={s.color}>
                            <div className={s['chat-color']} style={{backgroundColor: item.color}}></div>
                          </td>
                          <td className={s.avatar}>
                            <div className={s['table-avatar']}>
                              <img className={s['chat-avatar']} src={item.avatar} />
                            </div>
                          </td>
                          <td className={cx(s.user, 'hidden-xs-down')}>{item.username}</td>
                          <td className={cx(s.lastmsg)}>
                              {item.lastmsg}
                          </td>
                          <td className={cx(s.count, 'hidden-lg-down')}>{item.count}</td>
                          <td className={cx(s.country, 'hidden-sm-down')}>
                            <div className={cx('famfamfam-flags', item.country.toLowerCase())}></div>
                            <span>
                              {item.location}
                            </span>
                          </td>
                          <td className={cx(s.device, 'hidden-sm-down')}>Android</td>
                          <td className={cx(s.timeago, 'hidden-xs-down')}>{moment(item.timeago).fromNow()}</td>
                        </tr>
                    )
                })
              }
                <tr>
                    
                </tr>
              </tbody>
          </table>
        </div>
      </div>
 */