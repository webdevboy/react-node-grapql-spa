import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';
import s from './UrlsList.css';

class UrlsList extends React.Component {

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

  select(index, itemId, shiftKey, e) {
    if(shiftKey) {
      const { urls = [] } = this.props;

      let foundIndex = _.findIndex(urls, { id: this.props.selectedInTable[this.props.selectedInTable.length-1] }) || 0;
      const selectedItems = (foundIndex > index) ? urls.slice(index, foundIndex) : urls.slice(foundIndex, index+1);

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

  handleClick(e, index, id) {
    const shiftKey = e.shiftKey;
    if (!this.timeoutID) {
        this.timeoutID = setTimeout(() => {
            this.select(index, id, shiftKey, e)
            this.timeoutID = null
        }, this.delay);
    } else {
        this.timeoutID = clearTimeout(this.timeoutID);
        this.setEdit(index);
    }
  }

  setEdit = (id) => {
    this.props.setEdit(true, id);
  }

  render() {
    const { urls = [] } = this.props;
    return (<div className={s['main-container']}>

        <div className={s['content']}>
          <table className={cx(s['table'])}>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Description</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody onScroll={this.onScrollToBottom}>
                { urls.map((item, index) => {
                    return (
                      <tr key={index} onClick={e => this.handleClick(e, index, item.id)}>
                        <td>{item.link.split(',').map((url, index)=> <span key={index}>{url}</span>)}</td>
                        <td>{item.description}</td>
                        <td>{item.redirect}</td>
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
})

const mapDispatch = {
}

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(UrlsList));
