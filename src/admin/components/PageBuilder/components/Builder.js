import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import Editor from './Editor';
import PreviewLayer from './PreviewLayer';
import Treeview from './Treeview';
import cx from 'classnames';
import s from '../style.css';
import { Dialog, Intent, Button } from '@blueprintjs/core';
import history from 'core/history';
import Cookies from 'js-cookie';
import _ from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import { IntlProvider } from 'react-intl';

import {
  createNode,
  deleteNode,
  addChild,
  removeChild,
} from '../actions';

class Builder extends Component {

  static contextTypes = {
    components: PropTypes.object.isRequired,
    templates: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.originalState = false;

    this.state = {
      exitPrompt: false,
      sticky: false,
    }
  }

  _goToPages = () => history.push('/website/pages');

  exit = () => {
    if (this.originalState !== this.props.state) {
      this.setState({ exitPrompt: true })
    } else {
      this._goToPages();
    }
  }

  quit = () => {
    // discard changes
    this._goToPages();
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  save = async () => {
    this.setState({isSaving: true});
    await this.sleep(3000);
    this.setState({isSaving: false}, () => {
      this._goToPages();
    });
  }

  cancel = () => {
    this.setState({ exitPrompt: false })
  }

  toggleSticky = () => {
    console.log('here');
    const sidebarIsSticky = (Cookies.get('lj-builder-sticky') == 'true');
    Cookies.set('lj-builder-sticky', !sidebarIsSticky);
    this.setState({ sticky: !sidebarIsSticky })
  }

  componentDidMount = () => {
    const sidebarIsSticky = (Cookies.get('lj-builder-sticky') == 'true');
    this.setState({
      sticky: sidebarIsSticky
    })
  }

  render() {
    const sidebarProps = {
      toggleSticky: this.toggleSticky,
      sticky: this.state.sticky,
      exit: this.exit
    }

    const window = (process.env.BROWSER) ? window : undefined;

    return (
      <DragDropContextProvider backend={HTML5Backend} window={window}>
        <IntlProvider locale={'en'} messages={[]}>
          <div className={s.builder}>
            <Dialog
              lazy
              iconName="pt-icon-warning-sign"
              title="Leaving builder with active changes"
              isOpen={this.state.exitPrompt}
              isCloseButtonShown={!this.state.isSaving}
              canOutsideClickClose={!this.state.isSaving}
              canEscapeKeyClose={!this.state.isSaving}
              enforceFocus={true}
              onClose={this.cancel}>
              <div className="pt-dialog-body">
                Are you sure you want to leave the builder? <br/>
                Your changes will be lost if you don't save them.
              </div>
              <div className="pt-dialog-footer">
                <Button text="Cancel" className="pt-minimal" disabled={this.state.isSaving} active style={{float:'left'}} onClick={this.cancel} />
                <div className="pt-dialog-footer-actions">
                  <Button intent={Intent.DANGER} disabled={this.state.isSaving} className="pt-minimal" active text="Discard Changes" onClick={this.quit} />
                  <Button intent={Intent.SUCCESS} disabled={this.state.isSaving} loading={this.state.isSaving} className="pt-minimal" active onClick={this.save} text="Save Changes" />
                </div>
              </div>
            </Dialog>
            <PreviewLayer />
            <Sidebar {...sidebarProps} />
            <Editor />
            <Treeview />
          </div>
        </IntlProvider>
      </DragDropContextProvider>
    )
  }
}

const mapStateToProps = ({pageBuilder}) => ({})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Builder)


