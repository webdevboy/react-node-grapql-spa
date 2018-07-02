import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContactsList.css';
import cx from 'classnames';
import _ from 'lodash';
import { showSidebar } from '../../../../redux/actions/sidebar';
import { selectInTable } from '../../../../redux/actions/navigation';
import { updateOffice, reorderOffices } from '../../../../redux/actions/offices';
import CheckBox from '../../Checkbox';
import MdDrag from 'react-icons/lib/md/drag-handle';


import { connect } from 'react-redux';

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
});


class ContactsList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      predicate: 'last_login',
      order: true, // false -> asc | true -> desc
      selected: []
    };
    this.timeoutID = null;
    this.delay = 250;
  }

  inspectRoom = () => {
    this.props.showSidebar();
  }


  select = (index, itemId, shiftKey, e) => {
    if(shiftKey) {
      const offices = _.orderBy(this.props.offices, [this.state.predicate], [(this.state.order) ? 'desc' : 'asc']);

      let foundIndex = _.findIndex(offices, { id: this.props.selectedInTable[this.props.selectedInTable.length-1] }) || 0;
      const selectedItems = (foundIndex > index) ? offices.slice(index, foundIndex) : offices.slice(foundIndex, index+1);

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
    $(sortableContextObject).sortable("cancel");
    const id_old = this.props.offices[oldIndex].id;
    const id_new = this.props.offices[newIndex].id;
    this.reorderFromIndices(oldIndex, newIndex, id_old, id_new);
  }

  reorderFromIndices = (oldIndex, newIndex, id_old, id_new) => {
    this.props.reorderOffices({oldIndex, newIndex, id_old, id_new})
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
    const { offices = {} } = this.props;
    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th className={s['drag-handle']}></th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Postal code</th> 
                  <th>Location</th>
                  <th>Country</th>
                  <th>Phone</th>
                  <th>Alt phone</th> 
                  <th>Fax</th>
                  <th>Email</th>
                  <th>Coordinates</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>

                { Object.keys(offices).map((key, index) => {
                  
                    return(
                        <tr key={index} onClick={e => this.handleClick(e, index, offices[key].id)} className={cx( (this.props.selectedInTable.indexOf(offices[key].id) !== -1) ? s.selected : null ) }>
                          <td className={s['drag-handle']}><MdDrag id='drag-handle' size={24} /></td>
                          <td>{offices[key].name}</td>
                          <td>{offices[key].address}</td>
                          <td>{offices[key].postal_code}</td>
                          <td>{offices[key].location}</td>
                          <td>{offices[key].country}</td>
                          <td>{offices[key].phone}</td>
                          <td>{offices[key].alt_phone}</td>
                          <td>{offices[key].fax}</td>
                          <td>{offices[key].email}</td>
                          <td>{offices[key].coordinates}</td>
                        </tr>
                    )
                })
              }
              </tbody>
          </table>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  selectedInTable: state.interface.tableSelection.selectedInTable || [],
})

const mapDispatch = {
  selectInTable,
  showSidebar,
  updateOffice,
  reorderOffices
}

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(ContactsList));
