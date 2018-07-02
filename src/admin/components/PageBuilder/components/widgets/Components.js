import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import _ from 'lodash'
import s from '../../style.css'
import cx from 'classnames'
import Types from '../../types';
import { getEmptyImage } from 'react-dnd-html5-backend'


/**
 * DRAG SOURCE
 */
const spec = {
  beginDrag(props, monitor, component) {
    return props;
  }
}
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    itemType: monitor.getItemType(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}
class ComponentItem extends Component {

  constructor(props) {
    super(props);
    console.log(this);
  }

  componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true,
		})
	}

  render() {
    const { isDragging, connectDragSource } = this.props;
  
    return connectDragSource(
      <li className={cx(s.flexCell)}>
        <div className={cx(s.flexItem)}>
          {this.props.name}
        </div>    
      </li>
    )
  }
} 

const DraggableComponent = DragSource(Types.COMPONENT, spec, collect)(ComponentItem)

/**
 * 
 */
export class ComponentsWidget extends Component {

  state = {
    selected: []
  }

  static contextTypes = {
    components: PropTypes.object.isRequired
  }

  select = (id) => {
    if (!this.state.selected.includes(id)) {
      this.setState({ selected: [...this.state.selected, id]})
    } else {
      const index = this.state.selected.indexOf(id)
      this.setState({ 
        selected: [
          ...this.state.selected.slice(0, index),
          ...this.state.selected.slice(index + 1)
        ]
      })
    }
  }

  groupComponents = (components) => _.groupBy(components, ({component}) => component.category)
  
  render() {
    const components = this.groupComponents(this.context.components);
    const { selected } = this.state;

    return (
      <div className={s.components}>
        <ul>
          { Object.keys(components).map((key, component) => 
            <li className={s.componentGroup} key={`component-group-${key}`}>
              <button
              type="button"
              className={cx("pt-button pt-minimal", s.groupBtn, (selected.includes(key)) ? 'pt-active' : null)}
              onClick={() => this.select(key)}>
                {_.upperFirst(key)}
              </button>
              {
                (selected.includes(key)) ?
                <ul className={s.flexSquare}>
                  { components[key].map(component => 
                    <DraggableComponent 
                      key={`component-id-${_.kebabCase(component.displayName)}`}
                      name={component.displayName}
                      component={component.default}
                      {...component.component}
                    />
                  )}
                </ul>
                : null
              }
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({pageBuilder}) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentsWidget)
