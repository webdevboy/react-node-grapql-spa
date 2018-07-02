import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DepartmentList.css';
import cx from 'classnames';
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import { reorderTeam } from '../../../../redux/actions/team';
import history from 'core/history';
import { selectInTable } from '../../../../redux/actions/navigation';
import MdDrag from 'react-icons/lib/md/drag-handle';

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


class DepartmentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      predicate: 'last_login',
      order: true, // false -> asc | true -> desc
      selected: []
    };
    this.timeoutID = null;
    this.delay = 250;
    // this.rooms = _.orderBy(props.rooms, [this.state.predicate], [this.state.order]);

  }

  select = (index, itemId, shiftKey, e) => {
    if(shiftKey) {
      const teams = _.orderBy(this.props.teams, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

      let foundIndex = _.findIndex(teams, { id: this.props.selectedInTable[this.props.selectedInTable.length-1] }) || 0;
      const selectedItems = (foundIndex > index) ? teams.slice(index, foundIndex) : teams.slice(foundIndex, index+1);

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

  goTo = (e, department) => {

    e.preventDefault();
    const url = `/team/${department}`;
    history.push(url);
  }

  handleClick = (e, index, id) => {
    const shiftKey = e.shiftKey;
    if (!this.timeoutID) {
        this.timeoutID = setTimeout(() => {
            this.select(index, id, shiftKey, e)
            this.timeoutID = null
        }, this.delay, e);
    } else {
        this.timeoutID = clearTimeout(this.timeoutID);
        this.setEdit(index);
    }
  }

  setEdit = (id) => {
    this.props.setEdit(true, id);
    this.props.showSidebar();
  }

  onSourceListItemDragStart = (sortableContextObject, event, ui) => {
    this.dragStartIndex = ui.item.index();
  }

  onSourceListItemDragStop = (sortableContextObject, event, ui) => {
    const oldIndex = this.dragStartIndex;
    const newIndex = ui.item.index();
    $(sortableContextObject).sortable("cancel");
    const id_old = this.props.teams[oldIndex].id;
    const id_new = this.props.teams[newIndex].id;
    this.reorderFromIndices(oldIndex, newIndex, id_old, id_new);
  }

  reorderFromIndices = (oldIndex, newIndex, id_old, id_new) => {
    this.props.reorderTeam({oldIndex, newIndex, id_old, id_new})
    // var newStateSourceItems = this.state.sourceItems.slice();
    // newStateSourceItems.splice(newIndex, 0, newStateSourceItems.splice(oldIndex, 1)[0]);
    // this.setState({ sourceItems: newStateSourceItems });
    // console.log("order is " + JSON.stringify(this.state.sourceItems));
  }

  componentDidMount() {
    const that = this;
    if(window && $){
      require("jquery-ui/ui/widgets/sortable.js");
      $('tbody').sortable({
        handle: "#drag-handle",
        items: "> tr",
        cursor: "move",
        scroll: true,
        axis: "y",
        start(event, ui) {
          that.onSourceListItemDragStart(this, event, ui);
        },
        stop(event, ui) {
          that.onSourceListItemDragStop(this, event, ui);
        }
      });
    }
  }

  render() {
    const { teams } = this.props;
    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={s['drag-handle']}></th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Team Members</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { Object.keys(teams).map((key, index) => {
                  
                    return (
                        <tr key={index}  onClick={e => this.goTo(e, teams[key].name)} className={cx( (this.props.selectedInTable.indexOf(teams[key].id) !== -1) ? s.selected : null ) }>
                          <td className={s['drag-handle']}><MdDrag id='drag-handle' size={24} /></td>
                          <td>{teams[key].name}</td>
                          <td>{teams[key].description}</td>
                          <td>{teams[key].teamMembers.length}</td>
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
  selectedInTable: state.interface.tableSelection.selectedInTable || [],
});

const mapDispatch = {
  showSidebar,
  selectInTable,
  reorderTeam
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(DepartmentList));