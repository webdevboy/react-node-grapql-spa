import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames';
import s from '../style.css';
import { Tooltip2 as Tooltip } from '@blueprintjs/labs';
import {
  MdSmartphone,
  MdTabletMac,
  MdDesktopMac,
} from 'react-icons/lib/md';
import { changeDevice } from '../actions';

export class Header extends Component {

  static contextTypes = {
    options: PropTypes.object.isRequired
  }

  state = {
    language_id: this.context.options.langDefaults.language_id
  }

  changeLang = (language_id) => {
    this.setState({ language_id })
  }

  changeDevice = (device_id) => {
    this.props.changeDevice(device_id)
  }

  getIcon = (device_id) => {
    switch(device_id) {
      case 'desktop':
        return <MdDesktopMac />
      case 'mobile':
        return <MdSmartphone />
      case 'tablet':
        return <MdTabletMac />
      default:
        return null
    }
  }

  render() {
    const { options } = this.context;
    const { devices, currentDevice } = this.props;
    const { langs: languages } = options;

    return (
      <div className={s.header} ref="header">
        
        <div className={s.titleWrapper}>
          <ul className="pt-breadcrumbs">
            <li>
              <a href="#" className="pt-breadcrumbs-collapsed"></a>
            </li>
            <li>
              <a href="#" className="pt-breadcrumb-current">Page Title</a>
            </li>
          </ul>
        </div>

        <div className={s.device}>
          <div className={cx("pt-button-group pt-minimal pt-fill", s.deviceGroup)}>
            { devices.map(device => 
              <button
                key={`set-device-id-${device.id}`}
                title={device.name}
                type="button"
                className={cx("pt-button pt-fixed", s.deviceButton, (currentDevice === device.id) ? 'pt-intent-primary pt-active' : '')}
                onClick={() => this.changeDevice(device.id)}>
                  {this.getIcon(device.id)}
                {device.icon}
              </button>
            )}
          </div>
        </div>

        <div className={s.lang}>
          <div className="pt-select pt-minimal">
            <select
              className={cx(s.langPicker, 'pt-active')}
              value={this.state.language_id}
              name="language_id"
              onChange={this.changeLang}>
              { 
                languages.map(lang => 
                <option
                  key={`lang-opt-id-${lang.language_id}`}
                  value={lang.language_id}>

                  {lang.locale.language}
                </option>
              )}
            </select>
          </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = ({pageBuilder}) => ({
  devicesById: pageBuilder.devices.byId,
  devicesIds: pageBuilder.devices.ids,
  devices: pageBuilder.devices.ids.map(id => pageBuilder.devices.byId[id]),
  currentDevice: pageBuilder.devices.current
})

const mapDispatchToProps = {
  changeDevice
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

