import { Position } from '@blueprintjs/core';
import React from 'react';
import s from './TooltipLabel.css';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Tooltip2 as Tooltip } from '@blueprintjs/labs';

const TooltipLabel = ({ label, children, tooltip, required }) => (
  <div className={s.line}>
    <span>{ label }</span>
    { (required) ? <span style={{marginLeft: '5px'}} className="pt-text-muted">(required)</span> : null } 
    <Tooltip tooltipClassName={s.tooltip} content={(!children) ? tooltip : children} >
      <span className="pt-icon pt-icon-help"></span>
    </Tooltip>
  </div>
);

export default withStyles(s)(TooltipLabel);