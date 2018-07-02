import React, { Component } from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../NavBar.css";
import DropdownUsers from "./Users";
import DropdownWebsite from "./Website";
import DropdownTools from "./Tools";

const FullNav = ({ handleClick }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-dashboard"
      onClick={() => goTo('/')}
      text="Dashboard"
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-chat"
      onClick={() => goTo('/chat')}
      text="Chat"
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-media"
      onClick={() => goTo('/media')}
      text="Media"
      className={s.menuItem}
    />
    <MenuDivider />
    <MenuItem
      iconName="pt-icon-people"
      onClick={handleClick}
      text="Users"
      className={s.menuItem}
    >
      <DropdownUsers goTo={handleClick} />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-application"
      onClick={handleClick}
      text="Website"
      className={s.menuItem}
    >
      <DropdownWebsite goTo={handleClick} />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-wrench"
      onClick={handleClick}
      text="Tools"
      className={s.menuItem}
    >
      <DropdownTools goTo={handleClick} />
    </MenuItem>
  </Menu>
);

export default withStyles(s)(FullNav);
