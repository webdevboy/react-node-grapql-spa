import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./FooterLinks.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../Primitives/Text";
import Link from "../../Primitives/Link";
import { injectIntl } from "react-intl";
import FooterLink from "./FooterLink";
import { openFlyNow } from '../../../actions/ui';
import { connect } from 'react-redux';
import LanguageSwitcher from "../../i18n/LanguageSwitcher";
import CurrencySwitcher from "../../i18n/CurrencySwitcher";

class FooterLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) { }

  toggleFlyNow = (e) => {
    e.preventDefault();

    // console.log(this.refs);
    $("html, body").animate({ scrollTop: 0 }, "slow", () => {

      this.props.openFlyNow();

      // ReactDOM.findDOMNode().open();
    });
  }

  render() {
    const { classnames, id, post } = this.props;
    const contacts = this.state;

    return (
      <section className={cx(s["footer-links"])}>
        <div className={cx(s["footer-links-first"])}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              {/* why lunajets */}
              <div className={cx("col-sm-3 col-6", s["link-wrap"])}>
                <div className={s["link-title"]}>
                  <Text strong={true} defaultMessage="WHY LUNAJETS" id="client.footerLinks.why_lunajets" />
                </div>
                <div className={s["link-list"]}>
                  <ul>
                    <li>
                      <Link to="/why-lunajets/our-team" text="Team" className="footer" id="client.footerLinks.whyLunajets.ourTeam" />
                    </li>
                    <li>
                      <Link to="/why-lunajets/private-jet-hire-cost" text="Prices" className="footer" id="client.footerLinks.whyLunajets.privateJetCost" />
                    </li>
                    <li>
                      <Link to="/why-lunajets/reviews-testimonials" text="Testimonials" className="footer" id="client.footerLinks.whyLunajets.testimonials" />
                    </li>
                    <li>
                      <Link to="#" text="Social Responsability" className="footer" id="client.footerLinks.whyLunajets.corporateSocialResponsibility" />
                    </li>
                    {/* <li>
                      <Link to="/why-lunajets/our-history" text="Our History" className="footer" id="client.footerLinks.whyLunajets.ourHistory" />
                    </li>
                    <li>
                      <Link to="/why-lunajets/our-team" text="Partners" className="footer" id="client.footerLinks.whyLunajets.ourPartners" />
                    </li>
                    <li>
                      <Link to="#" text="Videos" className="footer" id="client.footerLinks.whyLunajets.videos" />
                    </li> */}
                  </ul>
                </div>
              </div>

              {/* services */}
              <div className={cx("col-sm-3 col-6", s["link-wrap"])}>
                <div className={s["link-title"]}>
                  <Text strong={true} defaultMessage="SERVICES" id="client.footerLinks.services" />
                </div>
                <div className={s["link-list"]}>
                  <ul>
                    <li>
                      <Link to="/services" text="Services" className="footer" id="client.footerLinks.services.service" />
                    </li>
                    <li>
                      <Link to="/empty-legs" text="Empty Legs" className="footer" id="client.footerLinks.emptyLegs" />
                    </li>
                    <li>
                      <Link to="/destinations" text="Destinations" className="footer" id="client.footerLinks.destinations" />
                    </li>
                    <li>
                      <Link to="/fleet" text="Fleet" className="footer" id="client.footerLinks.fleet" />
                    </li>
                  </ul>
                </div>
              </div>

              {/* support */}
              <div className={cx("col-sm-3 col-6", s["link-wrap"])}>
                <div className={s["link-title"]}>
                  <Text strong={true} defaultMessage="SUPPORT" id="client.footerLinks.support" />
                </div>
                <div className={s["link-list"]}>
                  <ul>
                    <li>
                      <Link to="#" text="Mobile App" className="footer" id="client.footerLinks.support.mobileApp" />
                    </li>
                    <li>
                      <Link to="#" text="Careers" className="footer" id="client.footerLinks.support.careers" />
                    </li>
                    <li>
                      <Link to="#" text="Press" className="footer" id="client.footerLinks.support.press" />
                    </li>
                    {/* <li>
                      <Link to="#" text="Contact us" className="footer" id="client.footerLinks.support.contactUs" />
                    </li>
                    <li>
                      <Link to="#" text="FAQ" className="footer" id="client.footerLinks.support.faq" />
                    </li>
                    <li>
                      <Link to="#" text="Glossary" className="footer" id="client.footerLinks.support.glossary" />
                    </li> */}
                  </ul>
                </div>
              </div>

              {/* lunajets sa */}
              <div className={cx("col-sm-3 col-6")}>
                <FooterLink
                  id={`client.footerLinks.${post ? post.id : "empty"}.04`}
                  post={post}
                  defaultMessage="LUNAJETS SA"
                  defaultLinks={
                    <div className={cx("row")}>
                      <div className={cx("col-12")}>
                        <ul>
                          <li>
                            <a href="tel:+41844041844" className="footer">
                              <span>+41 (0) 844 041 844</span>
                            </a>
                          </li>
                          <li>
                            <a href="tel:+41229890820" className="footer">
                              <span>+41 (0) 22 989 0820</span>
                            </a>
                          </li>
                        </ul>
                        <div className="row">
                          <div className="col d-flex justify-content-center">
                            <a href="#fly-now" onClick={e => this.toggleFlyNow(e)} className={cx("btn conduit", s["request-btn"])}>
                              <Text defaultMessage="REQUEST A CALL" id="client.home.reviews.request-call" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  } />
              </div>
            </div>
          </div>
        </div>

        <div className={cx(s["footer-links-second"])}>
          <div className={cx("container")}>
            {/* lunajets offices */}
            <div className={cx("row")}>
              <div className={cx("col-12")}>
                <div className={s["link-title"]}>
                  <Text strong={true} defaultMessage="LUNAJETS OFFICES" id="client.footerLinks.lunajets-offices" />
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-sm-3 col-6", s["link-wrap"])}>
                <div className={s["link-list"]}>
                  <ul>
                    <li>
                      <Text defaultMessage="Geneva HQ" className="footer" id="client.footerLinks.offices.geneva" />
                    </li>
                    <li>
                      <Text defaultMessage="Dubai" className="footer" id="client.footerLinks.offices.dubai" />
                    </li>
                    <li>
                      <Text defaultMessage="St Tropez" className="footer" id="client.footerLinks.offices.st-tropez" />
                    </li>
                    <li>
                      <Text defaultMessage="Ibiza" className="footer" id="client.footerLinks.offices.ibiza" />
                    </li>
                    <li>
                      <Text defaultMessage="Gstaad" className="footer" id="client.footerLinks.offices.gstaad" />
                    </li>
                  </ul>
                </div>
              </div>

              {/* services */}
              <div className={cx("col-sm-3 col-6", s["link-wrap"])}>
                <div className={s["link-list"]}>
                  <ul>
                    <li>
                      <Text defaultMessage="London Mayfair" className="footer" id="client.footerLinks.offices.london-mayfair" />
                    </li>
                    <li>
                      <Text defaultMessage="Budapest" className="footer" id="client.footerLinks.offices.budapest" />
                    </li>
                    <li>
                      <Text defaultMessage="Monaco" className="footer" id="client.footerLinks.offices.monaco" />
                    </li>
                    <li>
                      <Text defaultMessage="Palma" className="footer" id="client.footerLinks.offices.palma" />
                    </li>
                    <li>
                      <Text defaultMessage="Verbier" className="footer" id="client.footerLinks.offices.verbier" />
                    </li>
                  </ul>
                </div>
              </div>

              {/* support */}
              <div className={cx("col-sm-3 col-6", s["link-wrap"])}>
                <div className={s["link-list"]}>
                  <ul>
                    <li>
                      <Text defaultMessage="Miami" className="footer" id="client.footerLinks.offices.miami" />
                    </li>
                    <li>
                      <Text defaultMessage="Wroclaw" className="footer" id="client.footerLinks.offices.wroclaw" />
                    </li>
                    <li>
                      <Text defaultMessage="Olbia" className="footer" id="client.footerLinks.offices.olbia" />
                    </li>
                    <li>
                      <Text defaultMessage="Mykonos" className="footer" id="client.footerLinks.offices.mykonos" />
                    </li>
                    <li>
                      <Text defaultMessage="St Moritz" className="footer" id="client.footerLinks.offices.st-moritz" />
                    </li>
                  </ul>
                </div>
              </div>

              {/* currency and language */}
              <div className={cx("col-sm-3 col-6")}>
                <CurrencySwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// const mapState = state => ({
//   currentLocale: state.intl.locale,
//   intl: state.intl,
//   auth: state.auth
// });

// export default connect(mapState, { addTranslation })(withStyles(s)(FooterLinks));

export default connect(null, { openFlyNow })(injectIntl(withStyles(s)(FooterLinks)));
