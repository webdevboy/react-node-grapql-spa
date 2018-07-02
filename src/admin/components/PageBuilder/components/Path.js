import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames';
import s from '../style.css';

export class Path extends Component {

  static propTypes = {
    path: PropTypes.array,
    select: PropTypes.func
  }

  goToPath = (e, id) => {
    e.preventDefault();
    this.props.select(id)
  }

  render() {
    const { path } = this.props;
    return (
      <div className={s.path}>
        <ul className="pt-breadcrumbs">
          { path && path.map((path, index) => {
              
              let className = 'pt-breadcrumb'; // default

              if (index === 0) {
                className = 'pt-breadcrumbs-collapsed' // root
              }

              if (index === 0) {
                className = 'pt-breadcrumb-current' // root
              }

              return(
                <li>
                  <a onClick={(e) => this.goToPath(e, path.id)} className={className} />
                </li>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}

export default Path
