import React, { Component } from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../NavBar.css";

const DropdownUsers = ({ goTo }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-new-person"
      onClick={() => goTo("/users/add")}
      text="Add User"
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-user"
      onClick={() => goTo("/users?type=user")}
      text="Manage Users"
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-people"
      onClick={() => goTo("/users?type=account")}
      text="Manage Customers"
      className={s.menuItem}
    />
    <MenuDivider />
    <MenuItem
      iconName="pt-icon-id-number"
      onClick={() => goTo("/users/roles")}
      text="Roles"
      className={s.menuItem}
    >
      <MenuItem
        iconName="pt-icon-add"
        onClick={() => goTo("/users/roles/add")}
        text="Add Role"
        className={s.menuItem}
      />
      <MenuItem
        iconName="pt-icon-eye-open"
        onClick={() => goTo("/users/roles")}
        text="Manage Roles"
        className={s.menuItem}
      />
      <MenuItem
        iconName="cog"
        onClick={() => goTo("/users/permissions")}
        text="Permissions"
        className={s.menuItem}
      />
    </MenuItem>
  </Menu>
);

export default withStyles(s)(DropdownUsers);
