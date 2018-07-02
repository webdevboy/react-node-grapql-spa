import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavBar.css';
import cx from 'classnames'; 
import { Menu, MenuItem, MenuDivider, Popover, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import history from 'core/history';
import _ from 'lodash';

class NavItem extends React.Component {

  isActive = (path, children) => {
    const currentPath = (history.location && history.location.pathname) || '';
    if (typeof children !== 'undefined') {
      if (_.find(children, { path: currentPath })) {
        return true;
      }
    }
    if (currentPath === path) {
      return true;
    }
  }

  divider = (key) => <MenuDivider key={`menu-divider-${key}`} />

  menuItem = ({
    path,
    label,
    divider,
    icon,
    iconOnly,
    children,
    index,
  }) => {

    if (divider) {
      return this.divider(index);
    }

    if (children && children.length) {
      return (
        <MenuItem
          key={`menu-${label}`}
          iconName={icon}
          onClick={e => this.props.goTo(e, path)}
          text={label}
          className={cx(s.menuItem, this.isActive(path) ? s.isActiveChildren : null)}
        >
          { children.map(child => this.menuItem(child)) }
        </MenuItem>
      );
    }

    return (<MenuItem
      key={`menu-${label}`}
      iconName={icon} 
      onClick={e => this.props.goTo(e, path)}
      text={label}
      className={cx(s.menuItem, this.isActive(path) ? s.isActiveChildren : null)}
    />);
  }

  dropdownMenu = ({ children }) => {
    return (
      <Menu>
        {
          children.map((child, index) => {
            if (child.divider) {
              return this.divider(index);
            }
            return this.menuItem({ ...child, index });
          })
        }
      </Menu>
    );
  }

  dropdownMenuWrapper = ({
    label,
    icon,
    iconOnly,
    children,
    path,
  }) => {
    const dropdown = this.dropdownMenu({ children });
    return (
      <Popover
        inline
        content={dropdown}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
        className={cx(s.dropdown)}
      >
        <a className={cx("pt-button pt-minimal", icon, s.button, this.isActive(path, children) ? s.isActive : null)}>
          <span className={s.label}>{label}</span>
          <span className="pt-icon pt-icon-caret-down" />
        </a>
      </Popover>
    );
  }

  singleMenu = ({
    label,
    path,
    iconOnly,
    icon,
  }) => {
    return (
      <a
        href={path}
        className={cx("pt-button pt-minimal", icon, this.isActive(path) ? s.isActive : null)}
        onClick={e => this.props.goTo(e, path)}
      >
        { !iconOnly ? <span className={s.label}>{label}</span> : null }
      </a>
    );
  }

  render() {
    const {
      label,
      icon,
      iconOnly,
      children,
      path,
    } = this.props;

    if (children && children.length) {
      return this.dropdownMenuWrapper({
        label,
        icon,
        iconOnly,
        children,
        path,
      });
    }
    return this.singleMenu({
      label,
      icon,
      iconOnly,
      path,
    });
  }
}

export default withStyles(s)(NavItem);
