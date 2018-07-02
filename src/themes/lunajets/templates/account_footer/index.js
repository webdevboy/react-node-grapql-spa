import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FooterLinks from '../../components/Footer/FooterLinks'
import FooterEnd from '../../components/Footer/FooterEnd'
import cx from 'classnames';
import s from './footer.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from "../../components/Primitives/Text";
import Link from "../../components/Primitives/Link";

const flightBroker = `LunaJets is a flight broker and as such arranges carriage by air on behalf of its customers by chartering aircraft from third-party
aircraft operators. LunaJets only acts as an intermediary, does not itself operate aircraft
and is not a contracting or an indirect carrier.`;

class AccountFooter extends Component {

  render() {
    return (
      <footer className={cx("footer py-4", s['footer-end'])}>
        <div className={cx("container")}>
          {/* footer infos */}
          <div className={cx("row d-none d-sm-flex", s["company-infos"])}>
            {/* copyright */}
            <div className={cx("col-md-4 align-self-center", s["company-copyright"])}>
              <span>
                <Text
                  defaultMessage={"LunaJets © Copyright 2007-" + new Date().getFullYear()}
                  id="client.lunajets.copyright"
                />
              </span>
            </div>

            {/* flags */}
            <div className={cx("col-md-4 align-items-center justify-content-center d-flex", s["company-flag"])}>
              <i className={cx("famfamfam-flags", "ch")} />
              <span className={cx(s["company-based"])}>
                <Text defaultMessage="A Swiss based company" id="client.footerEnd.swissBasedCompany" />
              </span>
              <span />
            </div>

            {/* legal */}
            <div className={cx("col-md-4 align-items-center justify-content-end d-flex", s["company-legal"])}>
              <ul>
                <li>
                  <Link to="#" className={cx('mr-3')} text="Log Out" id="client.accountFooter.link.logout" />
                </li>
                <li>
                  <Link to="#" text="Contacts" id="client.accountFooter.link.contacts" />
                </li>
              </ul>
            </div>
          </div>

          <div className={cx("row d-flex d-sm-none", s["company-infos"])}>

            {/* flags */}
            <div className={cx("col-md-4 align-items-center my-1 justify-content-center d-flex", s["company-flag"])}>
              <i className={cx("famfamfam-flags", "ch")} />
              <span className={cx(s["company-based"])}>
                <Text defaultMessage="A Swiss based company" id="client.footerEnd.swissBasedCompany" />
              </span>
              <span />
            </div>

            {/* copyright */}
            <div className={cx("col-md-4 align-self-center my-1", s["company-copyright"])}>
              <span>
                <Text
                  defaultMessage={"LunaJets © Copyright 2007-" + new Date().getFullYear()}
                  id="client.lunajets.copyright"
                />
              </span>
            </div>

            {/* legal */}
            <div className={cx("col-md-4 align-items-center my-1 justify-content-center d-flex", s["company-legal"])}>
              <ul>
                <li>
                  <Link to="#" className={cx('mr-3')} text="Log Out" id="client.accountFooter.link.logout" />
                </li>
                <li>
                  <Link to="#" text="Contacts" id="client.accountFooter.link.contacts" />
                </li>
              </ul>
            </div>
          </div>

          <div className={cx("row", s["flight-broker"])}>
            <div className="col text-center">
              <Text defaultMessage={flightBroker} id="client.accountFooter.flight.broker" />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default withStyles(s)(AccountFooter);
