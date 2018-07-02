import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from "classnames";
import s from "./FlyNow.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { ChevronRight } from 'react-feather';
import FlyNowContent from './FlyNowContent'; 
import Text from "../../Primitives/Text";
import { connect } from 'react-redux';
import { closeFlyNow } from '../../../actions/ui';

export class FlyNow extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    }
  }

  open = () => {
    this.setState({
      open: true,
    })
  }

  toggleDropdown = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    }, () => {
      if (!this.state.open) {
        this.props.closeFlyNow();
      }
    });
  }

  handleClickOutside = (e) => {
    if ($('.modal-title').length) {
      return;
    }
    const el = ReactDOM.findDOMNode(this.flynow);
    if (el && !el.contains(e.target) && this.state.open) {
      this.setState({
        open: false,
      }, () => {
        this.props.closeFlyNow();
      })
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.open && this.props.open) {
      this.open();
    }
  }

  onComplete = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <li className={cx("nav-item", s["fly-now"])}>
        <a className={cx(s.flynow, "dropdown-toggle")} id="flynow-dropdown" onClick={this.toggleDropdown}>
          <strong><Text defaultMessage="FLY NOW" id="client.navBar.flyNow" /></strong><ChevronRight size={18} />
        </a>

        {
          this.state.open ?
          <div className={cx('dropdown-menu right', s.flyNowContent)} style={{display: 'block'}}>
            <FlyNowContent id="fly-now" onComplete={this.onComplete} ref={el => this.flynow = el}  />
          </div>
          : null
        }
        
      </li>
      
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.ui.flyNow,
});

export default connect(mapStateToProps, { closeFlyNow })(withStyles(s)(FlyNow));
