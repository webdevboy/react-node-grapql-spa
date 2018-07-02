import React, { Component } from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../NavBar.css";

const DropdownWebsite = ({ goTo }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-document"
      onClick={goTo}
      text="Pages"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={goTo}
        text="Create Page"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        iconName="pt-icon-document"
        onClick={goTo}
        text="Manage Pages"
        className={s.menuItem}
      />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-font"
      onClick={goTo}
      text="Articles"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={goTo}
        text="Create Article"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        iconName="pt-icon-font"
        onClick={goTo}
        text="Manage Articles"
        className={s.menuItem}
      />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-timeline-events"
      onClick={goTo}
      text="Events"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={goTo}
        text="Create Event"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        iconName="pt-icon-timeline-events"
        onClick={goTo}
        text="Manage Events"
        className={s.menuItem}
      />
    </MenuItem>
    <MenuItem
      iconName="pt-icon-people"
      onClick={() => goTo("/team-members")}
      text="Team Members"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={() => goTo("/team-members/add")}
        text="Add Team Member"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        iconName="pt-icon-people"
        onClick={goTo}
        text="Team Members"
        className={s.menuItem}
      />
      <MenuItem
        iconName="pt-icon-list"
        onClick={goTo}
        text="Team Departments"
        className={s.menuItem}
      />
    </MenuItem>

    <MenuItem
      iconName="pt-icon-office"
      onClick={() => goTo("/offices")}
      text="Offices"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={() => goTo("/offices/add")}
        text="Add Office"
        className={s.menuItem}
      />
      <MenuDivider />
      <MenuItem
        iconName="pt-icon-people"
        onClick={() => goTo("/offices")}
        text="Manage Offices"
        className={s.menuItem}
      />
    </MenuItem>


  </Menu>
);

export default withStyles(s)(DropdownWebsite);
