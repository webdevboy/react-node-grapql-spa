import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import { Tooltip, Button, Position, Toaster, Intent } from "@blueprintjs/core";
import LoadingSpinner from "admin/components/LoadingSpinner";

const Action = ({ label, action, icon, intent, className, type = 'button', loading, tooltip, disabled, saving }) => {
  
  if (tooltip) {
    return (
      <Tooltip content={tooltip} inline position={Position.LEFT} hoverOpenDelay={600}>
        <Button type={type} className={cx('pt-button pt-minimal', icon, intent, className)} onClick={(e) => action(e)} loading={loading}>{label}</Button>
      </Tooltip>
    );
  }

  return (
    <Fragment>
      { saving ? <LoadingSpinner /> : 
        <Button type={type} className={cx('pt-button pt-minimal', icon, intent, className)} onClick={(e) => action(e)} loading={loading} disabled={disabled}>{label}</Button>
      }
    </Fragment>
  )
}
  

export default Action