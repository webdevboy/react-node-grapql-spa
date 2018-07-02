import React, { Component } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../NavBar.css";

const Notifications = () => (
  <div className={s.notifications}>
    <ul>

      <li className={s.notification}>
        <div className={s.notificationInner}>
          <span className={'pt-icon-chat'}></span>  Lorem ipsum dolor sit amet ...
        </div>
      </li>

      <li className={s.notification}>
        <div className={s.notificationInner}>
          <span className={'pt-icon-chat'}></span>  Lorem ipsum dolor sit amet ...
        </div>
      </li>

      <li className={s.notification}>
        <div className={s.notificationInner}>
          <span className={'pt-icon-chat'}></span>  Lorem ipsum dolor sit amet ...
        </div>
      </li>

      <li className={s.notification}>
        <div className={s.notificationInner}>
          <span className={'pt-icon-chat'}></span>  Lorem ipsum dolor sit amet ...
        </div>
      </li>

    </ul>
  </div>
);

export default withStyles(s)(Notifications);
