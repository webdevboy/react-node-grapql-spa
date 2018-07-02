import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TranslationsList.css';
import cx from 'classnames';
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import { selectUsers } from '../../../../redux/actions/user';
import { setLanguageEnabled, updateTranslationTable } from '../../../../redux/actions/admin';
import CheckBox from '../../Checkbox'; 
import history from '../history';
import TiEdit from 'react-icons/lib/ti/edit';

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


class Row extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      translation: props.item.translation,
      defaultMessage: props.item.defaultMessage,
      description: props.item.description
    }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  keyDown = (ev) => {
    if(ev.keyCode == 13){
      ev.preventDefault();
      ev.stopPropagation();
      $(ev.target).blur();
      return false
    }
  }

  save = (ev) => {
    const { item, updateTranslationTable } = this.props;
    const { translation, defaultMessage, description } = this.state;
    updateTranslationTable({id: item.id, translation, defaultMessage, description});
    this.setState({
      editTranslation: false,
      editDefaultMessage: false,
      editDescription: false,
    })
  }

  editTranslation = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({
      editTranslation: true
    })
  }

  editDefaultMessage = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({
      editDefaultMessage: true
    })
  }

  editDescription = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({
      editDescription: true
    })
  }
 
  render(){
    const { item } = this.props;
    const { translation, defaultMessage, description, editTranslation=false, editDefaultMessage=false, editDescription=false } = this.state;
    return (
      <tr onDoubleClick={this.edit}>
        <td>{item.message_id}</td>
        <td>{ (item.description && !editDescription) ? 
          <span><TiEdit size={24} onClick={this.editDescription} className={s['icn']}/>{description}</span>
           : 
          <div className={'input-group'}>
            <input className={'form-control'} type='text' value={description} name='description' aria-describedby="basic-addon2" onKeyDown={this.keyDown} onChange={this.handleChange} onBlur={this.save}/>
          </div>} </td>
        <td>{ (item.defaultMessage && !editDefaultMessage) ? 
          <span><TiEdit size={24} onClick={this.editDefaultMessage} className={s['icn']}/>{defaultMessage}</span>
           : 
          <div className={'input-group'}>
            <input className={'form-control'} type='text' value={defaultMessage} name='defaultMessage' aria-describedby="basic-addon2" onKeyDown={this.keyDown} onChange={this.handleChange} onBlur={this.save}/>
          </div>} </td>
        <td>{ (item.translation && !editTranslation) ? 
          <span><TiEdit size={24} onClick={this.editTranslation} className={s['icn']}/>{translation}</span>
           : 
          <div className={'input-group'}>
            <input className={'form-control'} type='text' value={translation} name='translation' aria-describedby="basic-addon2" onKeyDown={this.keyDown} onChange={this.handleChange} onBlur={this.save}/>
          </div>} 
        </td>
      </tr>
  )
  }

}


class TranslationsList extends React.Component {

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

  handleDoubleClick = () => {
    history.push('/chat/1223');
  }

  inspectRoom = () => {
    this.props.showSidebar();
  }


  select = (e, index, itemId) => {
    console.log(e.metaKey);

    if(e.shiftKey) {
      const users = _.orderBy(this.props.users, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

      let foundIndex = _.findIndex(users, { id: this.props.selectedUsers[this.props.selectedUsers.length-1] }) || 0;
      console.log(foundIndex, index);      
      const selectedItems = (foundIndex > index) ? users.slice(index, foundIndex) : users.slice(foundIndex, index+1);

      const ids = selectedItems.map(item => {
        return item.id
      });

      this.props.selectUsers({ selectedUsers: [...this.props.selectedUsers, ...ids] })
    } else if (e.metaKey) { 
      this.props.selectUsers({ selectedUsers: [...this.props.selectedUsers, itemId] })
    } else {
      this.props.selectUsers({ selectedUsers: [itemId] });
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

    e.preventDefault();
    const url = `/translations/${locale}`;
    history.push(url);
  }

  enableLocale = (ev, id) => {
    ev.stopPropagation();
    this.props.setLanguageEnabled(id);
  }

  render() {
    const { updateTranslationTable, predicate, search } = this.props;

    let translations = this.props.translations.filter(translation => {
      let filteredRes = Object.keys(translation).map(key => {
        return _.includes(translation[key] ? translation[key].toLowerCase() : '', this.props.search.toLowerCase());
      })
      return filteredRes.includes(true);
    });

    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th>Message ID</th>
                  <th>Description</th>
                  <th>Default message</th>
                  <th>Translation</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { translations.map((item, index) => {
                    if(item.message_id.startsWith(predicate)){
                      return <Row item={item} key={index} updateTranslationTable={updateTranslationTable}/> 
                    } else{
                      return null
                    }
                })
              }
              </tbody>
          </table>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  selectedUsers: state.users.selectedUsers,
  translations: state.admin.translations
})

const mapDispatch = {
  showSidebar, 
  selectUsers, 
  setLanguageEnabled, 
  updateTranslationTable
}

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(TranslationsList));
