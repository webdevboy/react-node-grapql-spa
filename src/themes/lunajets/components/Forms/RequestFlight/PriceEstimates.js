import React from 'react'
import cx from "classnames";
import s from "./css/requestFlight.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from '../../Primitives/Text';
import FormattedCurrency from '../../i18n/FormattedCurrency';

class PriceEstimates extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { expanded } = this.props;

    return (
      <div className={s.priceWrapper}>

        <div className={s.category}>
            <div>
                <span className={s.catTitle}><Text textID={'client.aircraft.category.light-jet'} defaultMessage={'Light Jets'} /></span>
            </div>
            <div>
                <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" alt="" title="Light Jets" />
            </div>
            <div className={s.priceRange}>
                <div><FormattedCurrency className={s.price} value={8230}/></div>
                <div><FormattedCurrency className={s.price} value={13090}/></div>
            </div>
        </div>

        <div className={s.category}>
            <div>
                <span className={s.catTitle}><Text textID={'client.aircraft.category.midsize-jet'} defaultMessage={'Midsize Jets'} /></span>
            </div>
            <div>
                <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" alt="" title="Midsize Jets" />
            </div>
            <div className={s.priceRange}>
                <div><FormattedCurrency className={s.price} value={9180}/></div>
                <div><FormattedCurrency className={s.price} value={36120}/></div>
            </div>
        </div>

        <div className={s.category}>
            <div>
                <span className={s.catTitle}><Text textID={'client.aircraft.category.large-jet'} defaultMessage={'Large Jets'} /></span>
            </div>
            <div>
                <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" alt="" title="Large Jets" />
            </div>
            <div className={s.priceRange}>
                <div><FormattedCurrency className={s.price} value={22800}/></div>
                <div><FormattedCurrency className={s.price} value={91000}/></div>
            </div>
        </div>

        {
          expanded ?
          <div className={s.category}>
              <div>
                  <span className={s.catTitle}><Text textID={'client.aircraft.category.large-jet'} defaultMessage={'Large Jets'} /></span>
              </div>
              <div>
                  <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" alt="" title="Large Jets" />
              </div>
              <div className={s.priceRange}>
                  <div><FormattedCurrency className={s.price} value={22800}/></div>
                  <div><FormattedCurrency className={s.price} value={91000}/></div>
              </div>
          </div>
          : null
        }

{
          expanded ?
          <div className={s.category}>
              <div>
                  <span className={s.catTitle}><Text textID={'client.aircraft.category.large-jet'} defaultMessage={'Large Jets'} /></span>
              </div>
              <div>
                  <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" alt="" title="Large Jets" />
              </div>
              <div className={s.priceRange}>
                  <div><FormattedCurrency className={s.price} value={22800}/></div>
                  <div><FormattedCurrency className={s.price} value={91000}/></div>
              </div>
          </div>
          : null
        }

{
          expanded ?
          <div className={s.category}>
              <div>
                  <span className={s.catTitle}><Text textID={'client.aircraft.category.large-jet'} defaultMessage={'Large Jets'} /></span>
              </div>
              <div>
                  <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" alt="" title="Large Jets" />
              </div>
              <div className={s.priceRange}>
                  <div><FormattedCurrency className={s.price} value={22800}/></div>
                  <div><FormattedCurrency className={s.price} value={91000}/></div>
              </div>
          </div>
          : null
        }
    
      </div>
    )
  }
}

export default withStyles(s)(PriceEstimates)