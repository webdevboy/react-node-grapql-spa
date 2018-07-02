import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TeamList.css';
import cx from 'classnames';
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import history from '../history';
import { selectInTable } from '../../../../redux/actions/navigation';
import { reorderTeamMembers } from '../../../../redux/actions/team';
import { connect } from 'react-redux';
import moment from 'moment';
import MdDrag from 'react-icons/lib/md/drag-handle';
import { capitalize } from 'lodash';

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


class TeamMemberList extends React.Component {

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
    const team = _.find(this.props.teams, (team) => {if(team.name === this.props.department){ return team }})
    const teamMembers = team ? team.teamMembers : [];
    $(sortableContextObject).sortable("cancel");
    const id_old = teamMembers[oldIndex].id;
    const id_new = teamMembers[newIndex].id;
    this.reorderFromIndices(oldIndex, newIndex, id_old, id_new, team.id);
  }

  reorderFromIndices = (oldIndex, newIndex, id_old, id_new, id_team) => {
    this.props.reorderTeamMembers({oldIndex, newIndex, id_old, id_new, id_team})
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
    const { department, teams } = this.props;
    const team = _.find(teams, (team) => {if(team.name === department){ return team }})
    const teamMembers = team ? team.teamMembers : [];
    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={s['drag-handle']}></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Title</th>
                  <th>Bio</th>
                  <th>Visible</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { Object.keys(teamMembers).map((key, index) => {
                  
                    return (
                        <tr key={index}  className={cx( (this.props.selectedInTable.indexOf(teamMembers[key].id) !== -1) ? s.selected : null ) }>
                          <td className={s['drag-handle']}><MdDrag id='drag-handle' size={24} /></td>
                          <td>{`${capitalize(teamMembers[key].first_name)} ${capitalize(teamMembers[key].last_name)}`}</td>
                          <td>{teamMembers[key].email}</td>
                          <td>{teamMembers[key].title}</td>
                          <td>{teamMembers[key].bio}</td>
                          <td></td>
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
  teams: state.teams.teams,
});

const mapDispatch = {
  showSidebar,
  selectInTable,
  reorderTeamMembers
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(TeamMemberList));