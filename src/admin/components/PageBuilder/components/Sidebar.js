import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames';
import s from '../style.css';
import { Layout, Box, Sliders, Settings, Save, Sidebar as Sticky, RotateCcw, RotateCw, Power } from 'react-feather';
import { Tooltip2 as Tooltip } from '@blueprintjs/labs';
import _ from 'lodash';
import Components from './widgets/Components';
import Templates from './widgets/Templates';
import Properties from './widgets/Properties';
import { clearTimeout } from 'timers';

class Sidebar extends Component {
  
  sections = [
    {
      id: 'templates',
      name: 'Templates',
      icon: <Layout />,
      tooltip: 'Here you can choose a template for your page',
    },
    {
      id: 'components',
      name: 'Components',
      icon: <Box />,
      tooltip: 'Find components and add them to your page',
    },
    {
      id: 'props',
      name: 'Component Properties',
      icon: <Sliders />,
      tooltip: 'Configure the selected component properties, if available',
    },
    {
      id: 'options',
      name: 'Page Options',
      icon: <Settings />,
      tooltip: 'Global page options',
    },
  ]

  actions = [
    {
      id: 'sticky',
      tooltip: 'Set this sidebar as sticky, prevents collapsing when not using. Ideal for advanced use',
      icon: <Sticky />,
      action: (() => {
        console.log('sticky action trigger');
        this.props.toggleSticky()
      }).bind(this) 
    },
    {
      id: 'save',
      tooltip: 'Save the content',
      icon: <Save />,
      intent: 'pt-intent-success',
      action: (() => {
        console.log('save!')
      }).bind(this) 
    },
    {
      id: 'undo',
      tooltip: 'Undo the last action',
      icon: <RotateCcw />,
      action: (() => {
        console.log('undo!')
      }).bind(this) 
    },
    {
      id: 'redo',
      tooltip: 'Redo the last action',
      icon: <RotateCw />,
      action: (() => {
        console.log('redo!')
      }).bind(this) 
    },
    {
      id: 'exit',
      tooltip: 'Exit the current builder session, it will prompt a dialog to confirm changes if any',
      icon: <Power />,
      intent: 'pt-intent-danger',
      action: (() => {
        this.props.exit()
      }).bind(this) 
    },
  ]

  constructor(props, context) {
    super(props, context)

    this.state = {
      activeSection: undefined,
      open: false
    }

    this.active = this.state;
  }

  _toggleSection = (id) => this.setState({
    activeSection: (this.state.activeSection === id) ? undefined : id
  }, () => {
    this.active = this.state.activeSection
  })

  _renderSection = (id) => {
    switch(id) {
      case 'components':
        return <Components />
      
      case 'templates':
        return <Templates />

      case 'props':
        return <Properties />

      default:
        null
    }

  }


  componentDidUpdate(prevProps) {

    if (this.props.selected !== false && prevProps.selected === false) {

      if (this.props.selected === 'ROOT') {
        this.setState({
          activeSection: 'templates'
        })
      } else {
        this.setState({
          activeSection: 'props'
        })
      }
      
    }

    if (prevProps.selected !== false && this.props.selected === false) {
      this.setState({
        activeSection: this.active
      })
    }

  }

  onEnter = () => {    
    if (this.leaveTimeout) {
      window.clearTimeout(this.leaveTimeout);
    }
    this.setState({ open: true })
  }

  onLeave = () => {
    if (this.leaveTimeout) {
      window.clearTimeout(this.leaveTimeout);
    }

    this.leaveTimeout = window.setTimeout(() => {
      console.log('saiu');
      this.setState({ open: false })
    }, 6000)
  }

  componentDidMount() {
    // this.sidebar.addEventListener('mouseenter', this.onEnter);
    // this.sidebar.addEventListener('mouseleave', this.onLeave);
  }

  componentWillUnmount() {
    // this.sidebar.removeEventListener('mouseenter', this.onEnter, true);
    // this.sidebar.removeEventListener('mouseleave', this.onLeave, true);
  }
  

  render() {
    const { activeSection, open } = this.state;
    const { sticky, selected } = this.props;

    return (
      <div className={cx(s.sidebar, (open) ? s.open : null, (!open && (selected || activeSection || sticky)) ? s.open : null )} ref={(el) => this.sidebar = el}>
        <div className={cx("pt-button-group pt-vertical", s.group)}>
          {
            this.sections.map(section => [
              <Tooltip key={`section-menu-${section.id}`} hoverOpenDelay={1200} hoverCloseDelay={1000} tooltipClassName={s.tooltip} content={section.tooltip}>
                <button 
                  type="button"
                  className={
                    cx(
                      "pt-button pt-minimal",
                      s.button,
                      (activeSection === section.id) ? s.isActive : null
                    )
                  }
                  onClick={() => this._toggleSection(section.id)}
                >
                  <span className={s.icon}>{ section.icon }</span>
                  <span className={s.label}>
                    {section.name}
                  </span>
                </button>
              </Tooltip>,
              (activeSection && activeSection === section.id) ? 
              <div key={`section-area-${section.id}`} className={s.section}>
                { this._renderSection(section.id) }
              </div> : null
            ])
          }
        </div>
        
        <div className={cx("pt-button-group", ( open || activeSection || sticky ) ? null : 'pt-vertical', s.group, s.bottom)}>
          {
            this.actions.map(action =>
              <Tooltip key={`action-trigger-${action.id}`} hoverOpenDelay={1200} hoverCloseDelay={1000} tooltipClassName={s.tooltip} content={action.tooltip}>
                <button 
                  type="button"
                  className={
                    cx(
                      "pt-button pt-minimal",
                      s.button,
                      action.intent,
                      s.action,
                      (action.id === 'sticky' && this.props.sticky) ? s.isSticky : null
                    )
                  }
                  onClick={() => action.action()}
                >
                  <span className={s.icon}>{ action.icon }</span>
                </button>
              </Tooltip>
            )}
        </div>

      </div>
    )
  }
}

Sidebar.contextTypes = {
  components: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired
}


const mapStateToProps = ({pageBuilder}) => ({
  state: pageBuilder.builder.present,
  selected: pageBuilder.selected || false
})

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)