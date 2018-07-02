import React, { Component } from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../NavBar.css";

const DropdownTools = ({ goTo }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-document"
      onClick={() => goTo("/empty-legs")}
      text="Empty Legs"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={() => goTo("/empty-legs/add")}
        text="Create Empty Leg"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        onClick={goTo}
        text="Manage Empty Legs"
        className={s.menuItem}
      />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-airplane"
      onClick={goTo}
      text="Fleet"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={goTo}
        text="Add Aircraft"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        onClick={goTo}
        text="Manage Aircrafts"
        className={s.menuItem}
      />
      <MenuItem
        onClick={goTo}
        text="Aircraft Categories"
        className={s.menuItem}
      />
      <MenuItem
        onClick={goTo}
        text="Aircraft Manufacturers"
        className={s.menuItem}
      />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-history"
      onClick={goTo}
      text="Lead Tracking"
      className={s.menuItem}
    >
      <MenuItem
        onClick={goTo}
        text="Request Flight"
        className={s.menuItem}
      />
      <MenuItem
        onClick={goTo}
        text="Empty Legs"
        className={s.menuItem}
      />
      <MenuItem
        onClick={goTo}
        text="Contact Request"
        className={s.menuItem}
      />
    </MenuItem>
    <MenuDivider />
    <MenuItem
      iconName="pt-icon-console"
      onClick={goTo}
      text="Logs"
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-notifications"
      onClick={goTo}
      text="Push Notifications"
      className={s.menuItem}
    />
    <MenuDivider />
    <MenuItem
      iconName="pt-icon-translate"
      onClick={goTo("/translations")}
      text="Translations"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={goTo}
        text="Add Language"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        onClick={goTo("/translations")}
        text="Manage Languages"
        className={s.menuItem}
      />
      <MenuItem
        onClick={goTo}
        text="Missing Strings"
        className={s.menuItem}
      />
    </MenuItem>
  </Menu>
);

export default withStyles(s)(DropdownTools);
