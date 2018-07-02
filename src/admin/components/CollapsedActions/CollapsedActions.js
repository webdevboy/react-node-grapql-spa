import React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";

const CollapsedActions = ({ actions }) => {
  if (actions.length) {
    return (
      <Menu>
        { actions.map(({
 props: {
 icon, action, label, key, intent, className,
},
}) =>
          (<MenuItem
            iconName={icon}
            onClick={e => action}
            intent={intent}
            text={label}
            className={className}
          />))}
      </Menu>
    );
  }
  return null;
};

export default CollapsedActions;
