import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames';
import s from '../style.css';
import { ROOT } from '../reducer';
import _ from 'lodash';
import { DropTarget, DragSource } from 'react-dnd';
import Leaf from './Leaf';
import { clearHover } from '../actions';

export class Treeview extends Component {

  onMouseLeave = (e) => {
    this.props.clearHover()
  }

  render() {
    return (
      <div className={s.treeview} onMouseLeave={this.onMouseLeave}>
        <div className="pt-tree">
          <ul className="pt-tree-node-list pt-tree-root">
            <Leaf id={ROOT} depth={0} index={0} collection={ROOT} />
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ pageBuilder }) => ({})
const mapDispatchToProps = {
  clearHover
}

export default connect(mapStateToProps, mapDispatchToProps)(Treeview)
