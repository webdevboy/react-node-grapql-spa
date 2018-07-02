import React, { Component } from "react";

const UserInspectPanel = ({ user }) => (
  <div className="inspect-panel">
    <div className="inspect-panel-header">
      <img className="inspector-pane-avatar" src={user.avatar_path} alt={`Photo of ${user.first_name} ${user.last_name}`} />
      <h5>{`${user.first_name} ${user.last_name}`}</h5>
    </div>

    <div className="inspect-panel-body" />
  </div>
);

export default UserInspectPanel;
