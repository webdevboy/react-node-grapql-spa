import React from 'react';
import s from './css/requestFlight.css';

const Checkbox = ({
  field,
  name,
  label,
  value,
  labelPosition,
  icons,
  iconsPosition,
  onChange,
}) => {
  return (
    <div className={cx(s.option, s.checkbox)}>
      <label className={s.label} htmlFor={name}>
        { (label && labelPosition === 'left') ? <span className={s.labelText}>{label}</span> : null }
        { (icons && iconsPosition === 'left')
          ? <div className={s.icons}>
              { icons.map((icon, index) => <img className={s.optionIcon} key={`icon-${`name`}-${index}`} src={icon} />) }
            </div>
          : null
        }
        <input
          type="checkbox"
          id={name}
          name={name}
          value={value}
          checked={value}
          onTouchEnd={() => onChange({ field, value: !value })}
          onChange={() => onChange({ field, value: !value })}
        />
        { (icons && iconsPosition === 'right')
          ? <div className={s.icons}>
              { icons.map((icon, index) => <img className={s.optionIcon} key={`icon-${`name`}-${index}`} src={icon} />) }
            </div>
          : null
        }
        { (label && labelPosition === 'right') ? <span className={s.labelText}>{label}</span> : null }
      </label>
    </div>
  );
}

export default Checkbox;