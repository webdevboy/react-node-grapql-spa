import React from 'react';
import s from './css/requestFlight.css';
import cx from "classnames";
import { connect } from 'react-redux';
import { changeOption, toggleOptions } from '../../../actions/requestFlight';
import { Briefcase } from "react-feather";
import pets from "./gfx/options/pets.svg";
import golf from "./gfx/options/golf.svg";
import helicopter from "./gfx/options/helicopter.svg";
import catering from "./gfx/options/catering.svg";
import limousine from "./gfx/options/limousine.svg";
import skis from "./gfx/options/skis.svg";
import smokers from "./gfx/options/smokers.svg";
import wifi from "./gfx/options/wifi.svg";
import bicicle from "./gfx/options/bicicle.svg";
import overlay from './css/overlay.css';
import Text from '../../Primitives/Text';

const Options = ({ isOverlay, isMobile, toggleOptions, remaining, expanded, index, options, config, changeOption }) => {

  if (isMobile && remaining) {
    return (
      <div
        className={s.remainingLabel}
        onClick={(e) => toggleOptions(e, index)}
        // onTouchEnd={(e) => toggleOptions(e, index)}
      >
        <Briefcase size="18" color="#757372" className={s.optionIcon} />
        <span>
          <Text defaultMessage="More Options" id="form.request-flight.btn.more-options" />
        </span>
      </div>
    );
  }

  return (
    <div className={cx(s.moreoptions, remaining ? s.remaining : s.current, expanded ? s.open : null, isOverlay ? overlay.options : null )}>
      {
        (expanded) ? [
          <div className={s.optionsWrapper}>
            {/* LUGGAGE */}
            <div className={cx(s.option, s.dropdown, overlay.option)}>
              <label htmlFor={`opt-luggage-${index}`}>
                <Briefcase color="#757372" className={s.optionIcon} />
                <span className={s["value"]}>{options.luggage}</span>
                <select
                  id={`opt-luggage-${index}`}
                  value={options.luggage}
                  onChange={e => changeOption({ index, field: "luggage", value: e.target.value })}>
                  {config.luggage.map(opt => (
                    <option key={`opt-${opt}-${index}`} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* PETS */}
            <div className={cx(s.option, s.dropdown, overlay.option)}>
              <label htmlFor={`opt-pets-${index}`}>
                <img src={pets} alt="pets" className={s.optionIcon} />
                <span className={s["value"]}>{options.pets}</span>
                <select
                  id={`opt-pets-${index}`}
                  value={options.pets}
                  onChange={e => changeOption({ index, field: "pets", value: e.target.value })}>
                  {config.pets.map(opt => (
                    <option key={`opt-${opt}-${index}`} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* SMOKERS */}
            <div className={cx(s.option, s.checkbox, overlay.option)} style={{flex: '0'}}>
              <label htmlFor={`opt-smokers-${index}`}>
                <input
                  type="checkbox"
                  id={`opt-smokers-${index}`}
                  name={`opt-smokers-${index}`}
                  value={options.smokers}
                  checked={options.smokers}
                  onTouchEnd={() => changeOption({ index, field: 'smokers', value: !options.smokers })}
                  onChange={() => changeOption({ index, field: 'smokers', value: !options.smokers })}
                />
                <span className={s.fakebox} />
                <div className={cx(s.iconsOption, s['margin-left'])} style={{marginRight: '0'}}>
                  <img src={smokers} alt="smokers" className={s.optionIcon} />
                </div>
              </label>
            </div>

            {/* OTHERS */}
            <div className={cx(s.option, s.checkbox, overlay.option)}>
              <label htmlFor={`opt-others-${index}`}>
                <input
                  type="checkbox"
                  id={`opt-others-${index}`}
                  name={`opt-others-${index}`}
                  value={options.others}
                  checked={options.others}
                  onTouchEnd={() => changeOption({ index, field: 'others', value: !options.others })}
                  onChange={() => changeOption({ index, field: 'others', value: !options.others })}
                />
                <span className={s.fakebox} />
                <span className={s.label}>
                  <Text defaultMessage="Others" id="request.flight.options.others" />
                </span>
                <div className={cx(s.iconsOption, s.spaced)}>
                  <img src={skis} alt="skis" className={s.optionIcon} />
                  <img src={golf} alt="golf" className={s.optionIcon} />
                  <img src={bicicle} alt="bicicle" className={s.optionIcon} />
                </div>
              </label>
            </div>

            {/* TRANSFERS */}
            <div className={cx(s.option, overlay.option)}>
              <span className={s.label} style={{marginLeft: '0'}}>
                <Text defaultMessage="Transfers ($)" id="request.flight.options.transfers" />
              </span>
              <div className={s.checkbox}>
                <label htmlFor={`opt-limousine-${index}`}>
                  <input
                    type="checkbox"
                    id={`opt-limousine-${index}`}
                    name={`opt-limousine-${index}`}
                    value={options.limousine}
                    checked={options.limousine}
                    onTouchEnd={() => changeOption({ index, field: 'limousine', value: !options.limousine })}
                    onChange={() => changeOption({ index, field: 'limousine', value: !options.limousine })}
                  />
                  <span className={s.fakebox} />

                  <div className={cx(s.iconsOption, s['margin-left'])}>
                    <img src={limousine} alt="limousine" className={s.optionIcon} />
                  </div>
                </label>
              </div>
              <div className={s.checkbox}>
                <label htmlFor={`opt-helicopter-${index}`}>
                  <input
                    type="checkbox"
                    id={`opt-helicopter-${index}`}
                    name={`opt-helicopter-${index}`}
                    value={options.helicopter}
                    checked={options.helicopter}
                    onTouchEnd={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                    onChange={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                  />
                  <span className={s.fakebox} />

                  <div className={cx(s.iconsOption, s['margin-left'])}>
                    <img src={helicopter} alt="helicopter" className={s.optionIcon} />
                  </div>
                </label>
              </div>
            </div>

            {/* CATERING */}
            <div className={cx(s.option, s.checkbox, overlay.option)}>
              <label htmlFor={`opt-catering-${index}`}>
                <input
                  type="checkbox"
                  id={`opt-catering-${index}`}
                  name={`opt-catering-${index}`}
                  value={options.catering}
                  checked={options.catering}
                  onTouchEnd={() => changeOption({ index, field: 'catering', value: !options.catering })}
                  onChange={() => changeOption({ index, field: 'catering', value: !options.catering })}
                />
                <span className={s.fakebox} />

                <span className={s.label}>
                  <Text defaultMessage="Special Catering ($)" id="request.flight.options.catering" />
                </span>
                <div className={s.iconsOption}>
                  <img src={catering} alt="catering" className={s.optionIcon} />
                </div>
              </label>
            </div>

            {/* WIFI */}
            <div className={cx(s.option, s.checkbox, overlay.option)}>
              <label htmlFor={`opt-wifi-${index}`}>
                <input
                  type="checkbox"
                  id={`opt-wifi-${index}`}
                  name={`opt-wifi-${index}`}
                  value={options.wifi}
                  checked={options.wifi}
                  onTouchEnd={() => changeOption({ index, field: 'wifi', value: !options.wifi })}
                  onChange={() => changeOption({ index, field: 'wifi', value: !options.wifi })}
                />
                <span className={s.fakebox} />
                <span className={s.label}>
                  <Text defaultMessage="Wifi ($)" id="request.flight.options.wifi" />
                </span>
                <div className={s.iconsOption}>
                  <img src={wifi} alt="wifi" className={s.optionIcon} />
                </div>
              </label>
            </div>
          </div>,
          (remaining) ? 
          <div
          className={s.remainingLabel}
          onClick={(e) => toggleOptions(e, index)}>
            <Briefcase size="18" color="#757372" className={s.optionIcon} />
            <Text defaultMessage="More Options" id="form.request-flight.btn.more-options" />
          </div> : null,
        ]
        : (remaining) ?
          <div
          className={s.remainingLabel}
          onClick={(e) => toggleOptions(e, index)}>
            <Briefcase size="18" color="#757372" className={s.optionIcon} />
            <Text defaultMessage="More Options" id="form.request-flight.btn.more-options" />
          </div>
          : null
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  options: state.requestFlight.legs[ownProps.index].flightOptions,
  config: state.requestFlight.config.options,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  changeOption: ({ index, field, value }) => dispatch(changeOption({ index, field, value })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Options);