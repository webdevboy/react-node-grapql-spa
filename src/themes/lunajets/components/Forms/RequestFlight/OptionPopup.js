import React from 'react';
import s from './css/requestFlight.css';
import cx from "classnames";
import { connect } from 'react-redux';
import { changeOption, toggleOptions } from '../../../actions/requestFlight';
import { Briefcase, XCircle } from "react-feather";
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

const OptionPopup = ({ sticky, showOption: index, options, config, changeOption, toggleOptions }) => {
  return (
    <div className={cx("pt-card", s.optionModal, (sticky) ? s.isSticky : null)}>
      <span className={s.title}>
        <Text defaultMessage="More options" id="request.flight.options-popup.more-options" />
        <button type="button" onClick={(e) => toggleOptions(e, index)} className={s.closeBtn}><XCircle color="#333" /></button>
      </span>

      <div className={s.optionsWrapper}>
        {/* LUGGAGE */}
        <div className={cx(s.option, s.dropdown, overlay.option)}>
          <label htmlFor={`opt-luggage-${index}`}>
            <Briefcase color="#757372" className={s.optionIcon} />
            <div className={s.right}>
              <span className={s["value"]}>{options.luggage}</span>
              <select
                id={`opt-luggage-${index}`}
                value={options.luggage}
                onChange={e => changeOption({ index, field: "luggage", value: e.target.value })}>
                {config.luggage.map(opt => (
                  <option key={`opt-${opt}-${index}`} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
          </label>
        </div>

        {/* PETS */}
        <div className={cx(s.option, s.dropdown, overlay.option)}>
          <label htmlFor={`opt-pets-${index}`}>
            <img src={pets} alt="pets" className={s.optionIcon} />
            <div className={s.right}>
              <span className={s["value"]}>{options.pets}</span>
              <select
                id={`opt-pets-${index}`}
                value={options.pets}
                onChange={e => changeOption({ index, field: "pets", value: e.target.value })}>
                {config.pets.map(opt => (
                  <option key={`opt-${opt}-${index}`} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </label>
        </div>

        {/* SMOKERS */}
        <div className={cx(s.option, s.checkbox, overlay.option)} style={{flex: '0'}}>
          <label htmlFor={`opt-smokers-${index}`}>
            <div className={s.left}>
              <div className={cx(s.iconsOption)}>
                <img src={smokers} alt="smokers" className={s.optionIcon} />
              </div>
            </div>
            <div className={s.right}>
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
            </div>

          </label>
        </div>

        {/* OTHERS */}
        <div className={cx(s.option, s.checkbox, overlay.option)}>
          <label htmlFor={`opt-others-${index}`}>
            
            <div className={s.left}>
              <span className={s.label} style={{marginRight: '10px'}}>
                <Text defaultMessage="Others" id="request.flight.options.others" />
              </span>
              <div className={cx(s.iconsOption, s.spaced)}>
                <img src={skis} alt="skis" className={s.optionIcon} />
                <img src={golf} alt="golf" className={s.optionIcon} style={{margin: '0 10px'}} />
                <img src={bicicle} alt="bicicle" className={s.optionIcon} />
              </div>
            </div>

            <div className={s.right}>
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
            </div>

          </label>
        </div>

        {/* TRANSFERS */}
        <div className={cx(s.option, overlay.option, s.transfers)}>
          <label>
            <div className={s.left}>
              <span className={s.label} style={{marginLeft: '0'}}>
                <Text defaultMessage="Transfers ($)" id="request.flight.options.transfers" />
              </span>
            </div>
            <div className={(s.right)}>

              <span
                onTouchEnd={() => changeOption({ index, field: 'limousine', value: !options.limousine })}
                onClick={() => changeOption({ index, field: 'limousine', value: !options.limousine })}
                className={cx(s.optionIcon, (options.limousine) ? s.active : null)}
              >
                <svg width="39px" height="13px" viewBox="0 0 39 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>limousine</title>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="D---D6---Home-3" transform="translate(-809.000000, -466.000000)" fill="#757372" fill-rule="nonzero">
                            <g id="Group-70" transform="translate(695.000000, 460.000000)">
                                <g id="Group-60" transform="translate(86.000000, 0.000000)">
                                    <g id="limousine" transform="translate(28.000000, 6.000000)">
                                        <g id="limousine-(1)">
                                            <path d="M38.4272317,4.76765834 C38.358808,4.49347151 38.1289779,4.28948022 37.8486076,4.25408659 L33.0672545,3.63780049 L33.0141855,3.60013856 C31.7388156,2.68255703 29.2616879,0.89703924 29.023733,0.701881975 C28.4925289,0.249525514 27.8178067,0.00075204485 27.1200937,5.80622939e-07 L12.2847177,5.80622939e-07 C10.4260683,-0.000658375837 8.61047958,0.559590651 7.0753882,1.60748016 L4.40310318,3.42894798 C4.3617969,3.45831797 4.32338998,3.49156575 4.28840549,3.52823851 L4.21308164,3.61040999 L2.87608318,3.61040999 C1.92522753,3.61319823 1.07882862,4.21355891 0.761879464,5.11003951 L0.135321927,6.8664549 C-0.0572815199,7.41504365 -0.0438963669,8.01494186 0.172983856,8.55439406 C0.575622603,9.5664099 1.5558079,10.2295962 2.64497589,10.2269261 L4.18569114,10.2269261 L4.24389594,10.3981166 C4.61484581,11.5305087 5.67150973,12.2962803 6.86311187,12.2962803 C8.05471402,12.2962803 9.11137794,11.5305087 9.48232781,10.3981166 L9.54053261,10.2269261 L29.7615644,10.2269261 L29.8180573,10.3981166 C30.1899691,11.5300134 31.2466978,12.2951096 32.4381292,12.2951096 C33.6295605,12.2951096 34.6862892,11.5300134 35.058201,10.3981166 L35.1164058,10.2269261 L36.3472661,10.2269261 C37.4834627,10.2249018 38.4933043,9.50240793 38.8620558,8.42771302 C39.0162523,7.97743492 39.0417456,7.49306271 38.9356678,7.02908595 L38.4272317,4.76765834 Z M24.550523,1.36438953 L27.1183818,1.36438953 C27.4908546,1.36435128 27.8512331,1.49661139 28.1352538,1.73758501 C28.2003062,1.79236599 28.5358398,2.04915187 30.0508765,3.14648351 L30.6928411,3.61040999 L24.550523,3.61040999 L24.550523,1.36438953 Z M18.7796884,1.36438953 L23.187846,1.36438953 L23.187846,3.61040999 L18.7796884,3.61040999 L18.7796884,1.36438953 Z M13.0122776,1.36438953 L17.4204352,1.36438953 L17.4204352,3.61040999 L13.0122776,3.61040999 L13.0122776,1.36438953 Z M7.84916964,2.73391421 C8.89712829,2.01912858 10.1022545,1.56808718 11.3620004,1.41917052 L11.6496006,1.3849324 L11.6496006,3.61040999 L6.55839263,3.61040999 L7.84916964,2.73391421 Z M6.86824759,10.9390789 C6.30378485,10.9390785 5.79493515,10.5989626 5.57908489,10.0774007 C5.36323462,9.55583872 5.48291639,8.95560285 5.88229676,8.55671251 C6.28167714,8.15782218 6.8820595,8.03887743 7.40335603,8.25536788 C7.92465255,8.47185833 8.26414344,8.98112523 8.26345085,9.54558754 C8.26299861,9.91621324 8.11509901,10.2714288 7.85238533,10.5328578 C7.58967164,10.7942869 7.23373534,10.9404434 6.86311187,10.9390789 L6.86824759,10.9390789 Z M32.4441208,10.9390789 C31.8795028,10.9397712 31.3701277,10.6000949 31.1537378,10.0785881 C30.9373479,9.55708122 31.0566068,8.95656452 31.4558523,8.557319 C31.8550978,8.15807347 32.4556145,8.03881464 32.9771214,8.25520455 C33.4986282,8.47159446 33.8383045,8.98096952 33.8376122,9.54558754 C33.8371589,9.9159157 33.6894943,10.2708708 33.4271513,10.5322505 C33.1648084,10.7936301 32.8093124,10.9399879 32.4389851,10.9390789 L32.4441208,10.9390789 Z M37.5798383,7.98604132 C37.3997209,8.51099842 36.9056869,8.86329005 36.3506899,8.86253711 L35.1198296,8.86253711 L35.0616249,8.69134652 C34.6897131,7.55944976 33.6329843,6.79435361 32.441553,6.79435361 C31.2501216,6.79435361 30.1933929,7.55944976 29.8214811,8.69134652 L29.7649882,8.86253711 L9.54053261,8.86253711 L9.48232781,8.69134652 C9.11137794,7.55895442 8.05471402,6.79318287 6.86311187,6.79318287 C5.67150973,6.79318287 4.61484581,7.55895442 4.24389594,8.69134652 L4.18569114,8.86253711 L2.64497589,8.86253711 C2.11622664,8.86069336 1.64177342,8.53738738 1.4466418,8.04595802 C1.3547326,7.81475615 1.34986619,7.55805297 1.43294655,7.32353376 L2.05950409,5.56027074 C2.18454844,5.20888982 2.51681197,4.97390757 2.88977842,4.97308704 L32.7796544,4.97308704 L37.2186262,5.54143978 L37.6123645,7.3355171 C37.6616017,7.55144096 37.6491444,7.77685774 37.5764145,7.98604132 L37.5798383,7.98604132 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
              </span>
          
              <span className={s.seperator} />
              
              <span
                onTouchEnd={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                onClick={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                className={cx(s.optionIcon, (options.helicopter) ? s.active : null)}
              >
                <svg
                  width="30px" height="18px" viewBox="0 0 30 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>Group 4</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="helicopter" transform="translate(-888.000000, -460.000000)" fill="#757372" fill-rule="nonzero">
                          <g id="Group-70" transform="translate(695.000000, 460.000000)">
                              <g id="Group-61" transform="translate(166.000000, 0.000000)">
                                  <g id="Group-4" transform="translate(27.000000, 0.000000)">
                                      <g id="helicopter-copy">
                                          <path d="M2.44779114,6.14868316 C1.39196885,6.14868316 0.533347649,7.47750168 0.533347649,9.11151237 C0.533347649,10.7455231 1.39196885,12.0743416 2.44779114,12.0743416 C3.50361343,12.0743416 4.36223463,10.7455231 4.36223463,9.11151237 C4.36223463,7.47750168 3.50361343,6.14868316 2.44779114,6.14868316 Z M2.44779114,10.5928923 C1.91940886,10.5928923 1.49059183,9.92771914 1.49059183,9.11151237 C1.49059183,8.29530559 1.91940886,7.63013248 2.44779114,7.63013248 C2.97617341,7.63013248 3.40499045,8.29530559 3.40499045,9.11151237 C3.40499045,9.92771914 2.97617341,10.5928923 2.44779114,10.5928923 Z" id="Shape"></path>
                                          <path d="M20.1387583,6.55083779 L19.1136395,4.50055747 C19.0129219,4.3002903 18.807876,4.17346368 18.5838864,4.17346368 L16.8061915,4.17346368 C16.6485878,4.17346368 16.4980392,4.23629369 16.3878222,4.34651007 L14.1905913,6.54372705 L4.95485545,6.54372705 C4.6277596,6.54372705 4.36227198,6.80921299 4.36227198,7.13630678 C4.36227198,7.46101181 4.62420421,7.72533114 4.94652251,7.72888651 C4.66564672,7.73244188 4.41793605,7.93626442 4.37054937,8.22424917 C4.31605191,8.54662099 4.53526391,8.85238257 4.85763776,8.90571308 C7.02881427,9.26719394 10.7251974,10.1572024 11.5737689,11.0306561 L11.6117116,11.1053188 C12.7316594,13.2978138 14.1265388,16.0247805 16.806136,16.0247805 L25.1020268,16.0247805 C27.466361,16.0247805 29.25,14.7507924 29.25,13.061993 C29.25,11.2676436 25.2407426,6.76182661 20.1387583,6.55083779 Z M25.1020824,14.8396211 L16.806136,14.8396211 C14.8518383,14.8396211 13.690448,12.568908 12.6676624,10.5660696 L12.5929992,10.4214661 C12.5716668,10.3811905 12.5456125,10.3420815 12.5159472,10.3065278 C11.2277295,8.80377403 5.6800994,7.84149166 5.05201759,7.73716385 C5.02357447,7.73121972 4.99274257,7.72888651 4.96429945,7.72888651 L14.4358577,7.72888651 C14.5934614,7.72888651 14.74401,7.66605651 14.854227,7.55584012 L17.0514579,5.35862314 L18.2176257,5.35862314 L19.2391892,7.40179272 C19.3399067,7.60205989 19.5449527,7.72888651 19.7689422,7.72888651 C24.6303266,7.72888651 28.0648331,12.1754844 28.0648331,13.0619374 C28.0648886,14.0419966 26.7363395,14.8396211 25.1020824,14.8396211 Z" id="Shape"></path>
                                          <path d="M26.7373096,12.7316515 L21.9371447,12.7316515 C21.137893,12.7316515 20.4463785,12.1655459 20.2166589,11.3242562 L18.9340762,6.61748927 C18.8395748,6.26991416 18.5057634,6.07242829 18.1898989,6.17641694 C17.8728566,6.28176331 17.6933882,6.64908701 17.7890673,6.99666212 L19.07165,11.703429 C19.4545348,13.1068746 20.6067224,14.0495611 21.9371447,14.0495611 L26.7373096,14.0495611 C27.0675316,14.0495611 27.3355565,13.7533323 27.3355565,13.3899583 C27.3355565,13.0265843 27.0675316,12.7316515 26.7373096,12.7316515 Z" id="Shape"></path>
                                          <path d="M4.29546025,5.19435402 L3.0260798,2.56158785 C2.87500133,2.2496075 2.51453132,2.11404167 2.20606705,2.25226081 L0.916336535,2.8288321 C0.614239102,2.96310212 0.461911069,3.31586947 0.565982057,3.64105468 L1.20070203,5.61561388 C1.31369849,5.96048298 1.6741685,6.14609155 2.00423241,6.03156711 C2.33679545,5.91704268 2.51708996,5.54452975 2.40534306,5.19830313 L1.9547258,3.79766191 L2.15781001,3.70683219 L3.1606164,5.78536426 C3.27230379,6.01570894 3.49573807,6.14868316 3.72803832,6.14868316 C3.82324334,6.14868316 3.91969793,6.12498845 4.01109475,6.07889483 C4.32467629,5.91568517 4.45159648,5.52077333 4.29546025,5.19435402 Z" id="Shape"></path>
                                          <path d="M4.09753313,8.1752425 C3.86213125,8.05575809 3.57411381,8.15251223 3.45542604,8.39648079 L3.39514019,8.51994647 C3.35113691,8.29380104 3.15780952,8.12390263 2.92626521,8.12390263 C2.66215578,8.12390263 2.44779114,8.34514091 2.44779114,8.61771907 L2.44779114,9.60530566 C2.44779114,9.87788382 2.66215578,10.0991221 2.92626521,10.0991221 L3.40473928,10.0991221 C3.58559683,10.0991221 3.75115863,9.99343326 3.8334237,9.82557178 L4.31189777,8.83798519 C4.42959871,8.59401662 4.33392184,8.29773602 4.09753313,8.1752425 Z" id="Shape"></path>
                                          <path d="M16.5752086,0.223024735 C16.1742963,0.223024735 15.8488956,0.5180022 15.8488956,0.881431226 L15.8488956,1.53983772 C15.8488956,1.90326674 16.1742963,2.19824421 16.5752086,2.19824421 C16.9761208,2.19824421 17.3015216,1.90326674 17.3015216,1.53983772 L17.3015216,0.881431226 C17.3014535,0.517940476 16.9761208,0.223024735 16.5752086,0.223024735 Z" id="Shape"></path>
                                          <path d="M26.7612073,2.19824421 L16.4232448,2.19824421 C16.1062139,2.19824421 15.8488956,2.53397514 15.8488956,2.94761475 C15.8488956,3.36125437 16.1062139,3.6969853 16.4232448,3.6969853 L26.7612073,3.6969853 C27.0782382,3.6969853 27.3355565,3.36125437 27.3355565,2.94761475 C27.3355565,2.53397514 27.0782382,2.19824421 26.7612073,2.19824421 Z" id="Shape"></path>
                                          <path d="M17.1889899,2.19824421 L6.85102732,2.19824421 C6.53399647,2.19824421 6.27667812,2.53397514 6.27667812,2.94761475 C6.27667812,3.36125437 6.53399647,3.6969853 6.85102732,3.6969853 L17.1889899,3.6969853 C17.5060207,3.6969853 17.7633391,3.36125437 17.7633391,2.94761475 C17.7633391,2.53397514 17.5060207,2.19824421 17.1889899,2.19824421 Z" id="Shape"></path>
                                          <path d="M18.4896521,14.0495611 C18.0887398,14.0495611 17.7633391,14.3445431 17.7633391,14.7079778 L17.7633391,17.3415832 C17.7633391,17.7050179 18.0887398,18 18.4896521,18 C18.8905643,18 19.215965,17.7050179 19.215965,17.3415832 L19.215965,14.7079778 C19.215965,14.3444814 18.8905643,14.0495611 18.4896521,14.0495611 Z" id="Shape"></path>
                                          <path d="M24.2329825,14.0495611 C23.8320703,14.0495611 23.5066695,14.3445431 23.5066695,14.7079778 L23.5066695,17.3415832 C23.5066695,17.7050179 23.8320703,18 24.2329825,18 C24.6338948,18 24.9592955,17.7050179 24.9592955,17.3415832 L24.9592955,14.7079778 C24.9592274,14.3444814 24.6338948,14.0495611 24.2329825,14.0495611 Z" id="Shape"></path>
                                          <path d="M27.0341098,16.0878609 C26.7501986,15.9545269 26.3908503,16.0394811 26.2318026,16.2774915 C25.9525856,16.6952713 24.814511,16.9560134 24.3903839,17.0123099 L12.6090925,17.0123099 C12.2839283,17.0123099 12.0200086,17.233561 12.0200086,17.506155 C12.0200086,17.7787489 12.2839283,18 12.6090925,18 L24.4716749,17.9950463 C24.6896476,17.9693517 26.6205858,17.7174986 27.2603109,16.7594846 C27.4193586,16.5214742 27.318021,16.2211949 27.0341098,16.0878609 Z" id="Shape"></path>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
                </svg>
              </span>

              {/* <object
                onTouchEnd={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                onClick={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                data={helicopter}
                className={cx(s.optionIcon, (options.helicopter) ? s.active : null)}
                type="image/svg+xml"
              />  */}
              {/* <img
                src={helicopter}
                onTouchEnd={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                onClick={() => changeOption({ index, field: 'helicopter', value: !options.helicopter })}
                className={s.optionIcon}
              /> */}
            </div>
          </label>
        </div>

        {/* CATERING */}
        <div className={cx(s.option, s.checkbox, overlay.option)}>
          <label htmlFor={`opt-catering-${index}`}>
            <div className={s.left}>
              <div className={s.iconsOption} style={{marginRight: '10px'}}>
                <img src={catering} alt="catering" className={s.optionIcon} />
              </div>
              <span className={s.label}>
                <Text defaultMessage="Special Catering ($)" id="request.flight.options.catering" />
              </span>
            </div>
            <div className={s.right}>
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
            </div>
            
          </label>
        </div>

        {/* WIFI */}
        <div className={cx(s.option, s.checkbox, overlay.option)}>
          <label htmlFor={`opt-wifi-${index}`}>

            <div className={s.left}>
              <div className={s.iconsOption} style={{marginRight: '10px'}}>
                <img src={wifi} alt="wifi" className={s.optionIcon} />
              </div>
              <span className={s.label}>
                <Text defaultMessage="Wifi ($)" id="request.flight.options.wifi" />
              </span>
            </div>

            <div className={s.right}>
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
            </div>
          </label>
        </div>
      </div>
      {
        (!sticky) ? 
        <button className={s.requestbtn} type="button" onClick={(e) => toggleOptions(e, index)} >
          <Text defaultMessage="DONE" id="request.flight.options-popup.more-options.done" />
        </button> : null
      }
      
    </div>
  )
}

const mapStateToProps = ({ requestFlight }, ownProps) => ({
  options: requestFlight.legs[requestFlight.showOption].flightOptions,
  config: requestFlight.config.options,
  showOption: requestFlight.showOption,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  changeOption: ({ index, field, value }) => dispatch(changeOption({ index, field, value })),
  toggleOptions: (e, index) => {
    e.preventDefault();
    dispatch(toggleOptions({ index }))
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(OptionPopup);