import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import s from '../../style.css'
import cx from 'classnames'
import { setRootTemplate } from '../../actions'
import { ROOT } from '../../reducer'

export class TemplatesWidget extends Component {

  select = (id) => {
    console.log(id)
    this.props.setRootTemplate(id)
  }

  static contextTypes = {
    templates: PropTypes.object.isRequired
  }

  render() {
    const { rootTemplate } = this.props;
    const { templates } = this.context;

    return (
      <div className={s.templates}>
        <ul className={s.flexSquare}>
          { Object.keys(templates).map((key) => 
            <li
              className={cx(s.flexCell)}
              key={`component-id-${_.kebabCase(templates[key].displayName)}`}
              >
                <div
                className={cx(s.flexItem, (rootTemplate === key) ? s.isActive : null)}
                onClick={() => this.select(key)}>
                  { templates[key].displayName }
                </div>
            </li>            
          )}   
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({pageBuilder}) => ({
  rootTemplate: pageBuilder.builder.present[ROOT].template
})

const mapDispatchToProps = {
  setRootTemplate
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesWidget)
