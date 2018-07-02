import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import s from "./css/overlay.css";

const StepIndicator = ({ steps, step, jumpToStep, completedSteps, maxSteps }) => {
  return (
    <div className={s.stepIndicator}>
      { _.map(steps, (_, index) => (
        <div
          key={`step-${index+1}`}
          onClick={() => jumpToStep(index + 1)}
          onTouchEnd={() => jumpToStep(index + 1)}
          className={cx(s.step,
            (step === index + 1) ? s.isActive : null,
            (step > index + 1) ? s.previousStep : null,
            (step < index + 1 && completedSteps.includes(index + 1)) ? s.isComplete : null,
            (step === maxSteps) ? s.isDisabled : null,
          )}>
          <span>{index + 1}</span>
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
