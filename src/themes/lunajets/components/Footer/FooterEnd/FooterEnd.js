import React, { Fragment } from "react";
import { Query, graphql } from 'react-apollo';
import * as _ from 'lodash';
import cx from "classnames";
import s from "./FooterEnd.css";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Instagram from "react-feather/dist/icons/instagram";
import Youtube from "react-icons/lib/io/social-youtube-outline";
import LinkedIn from "react-icons/lib/fa/linkedin";
import Twitter from "react-icons/lib/fa/twitter";
import Facebook from "react-icons/lib/fa/facebook";
import appStore from "./gfx/app-store-badge.svg";
import playStore from "./gfx/play-store-badge.svg";
import baca from "./gfx/BACA.png";
import ebaa from "./gfx/EBAA.png";
import lcert from "./gfx/LCERT.svg";
import nbaa from "./gfx/NBAA.svg";

import Link from "../../Primitives/Link";
import Text from "../../Primitives/Text";
import RichImage from "../../Primitives/RichImage";
import GET_SETTINGS from "shared/queries/getSettings.gql";

const flightBroker = `LunaJets is a flight broker and as such arranges carriage by air,
acting as agent of, and on behalf of its customers by chartering aircraft from third-party
aircraft operators. LunaJets only acts as an intermediary, does not itself operate aircraft
and is not a contracting or an indirect carrier.`;

class FooterEnd extends React.Component {
  static contextTypes = {
    hreflangs: PropTypes.any,
    params: PropTypes.any,
    query: PropTypes.any,
  };

  render() {
    const { classnames, id } = this.props;
    const contacts = this.state;
    return (
      <footer className={cx(s["footer-end"])}>
        {/* first part */}
        <section className={cx(s["footer-end-first"])}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div className={cx(s.association, "col-12")}>
                <div className={s.logos}>
                  <div className={cx(s.logo, "d-inline-block px-2 px-sm-0")}>
                    <RichImage
                      to="#"
                      text="Argus certified"
                      id="client.home.certification.ArgusCertified"
                      src={lcert}
                      height="40"
                      className="footer_social"
                      targetBlank={true}
                    />
                  </div>
                  <div className={cx(s.logo, "d-inline-block px-2 px-sm-0")}>
                    <RichImage
                      to="#"
                      text="BACA certified"
                      id="client.home.certification.BacaCertified"
                      src={baca}
                      height="40"
                      className="footer_social"
                      targetBlank={true}
                    />
                  </div>
                  <div className={cx(s.logo, "d-inline-block px-2 px-sm-0")}>
                    <RichImage
                      to="#"
                      text="NBAA certified"
                      id="client.home.certification.NbaaCertified"
                      src={nbaa}
                      height="35"
                      className="footer_social"
                      targetBlank={true}
                    />
                  </div>
                  <div className={cx(s.logo, "d-inline-block px-2 px-sm-0")}>
                    <RichImage
                      to="#"
                      text="EBAA certified"
                      id="client.home.certification.EbaaCertified"
                      src={ebaa}
                      height="30"
                      className="footer_social"
                      targetBlank={true}
                    />
                  </div>
                  <div className={cx(s.badge, "d-inline-block px-2 px-sm-0")}>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.abonobo.lunajets"
                      className="footer_social"
                      target="_blank"
                    >
                      <img src={playStore} height="40" />
                    </a>
                  </div>
                  <div className={cx(s.badge, "d-inline-block px-2 px-sm-0")}>
                    <a
                      href="https://itunes.apple.com/app/lunajets-private-jets/id462220739"
                      className="footer_social"
                      target="_blank"
                    >
                      <img src={appStore} height="40" />
                    </a>
                  </div>

                  <Query query={GET_SETTINGS}>
                    {({ loading, error, data }) => {
                      if (loading) return null;
                      if (error) return `Error!: ${error}`;

                      const urls = {};
                      const urlNames = ["twitter", "facebook", "instagram", "linkedin", "youtube"];

                      urlNames.forEach(urlName => {
                        const urlObject = _.find(data.settings, { option: `social_media_${urlName}` });
                        urls[urlName] = urlObject ? urlObject.value : "#";
                      });

                      return (
                        <Fragment>
                          <div className="px-2 px-sm-0">
                            <a href={urls.facebook} target="_blank" className="footer_social">
                              <Facebook size={30} color="#7F7F7F" />
                            </a>
                          </div>
                          <div className="px-2 px-sm-0">
                            <a href={urls.twitter} target="_blank" className="footer_social">
                              <Twitter size={30} color="#7F7F7F" />
                            </a>
                          </div>
                          <div className="px-2 px-sm-0">
                            <a href={urls.linkedin} target="_blank" className="footer_social">
                              <LinkedIn size={30} color="#7F7F7F" />
                            </a>
                          </div>
                          <div className="d-flex align-items-center px-2 px-sm-0">
                            <a href={urls.instagram} target="_blank" className="footer_social" style={{ lineHeight: 0 }}>
                              <Instagram size={30} color="#7F7F7F" />
                            </a>
                          </div>
                          <div className="px-2 px-sm-0">
                            <a href={urls.youtube} target="_blank" className="footer_social">
                              <Youtube size={30} color="#7F7F7F" />
                            </a>
                          </div>
                        </Fragment>
                      );
                    }}
                  </Query>
                </div>
              </div>
              {/* <div className={cx(s.switches, "col-md-4 align-self-center")}>
                <div className={s.badges}>
                  <div className={cx(s.badge, "d-inline-block mr-2")}>
                    <a href="https://itunes.apple.com/app/lunajets-private-jets/id462220739" target="_blank">
                      <img src={appStore} height="35" />
                    </a>
                  </div>
                  <div className={cx(s.badge, "d-inline-block")}>
                    <a href="https://play.google.com/store/apps/details?id=com.abonobo.lunajets" target="_blank">
                      <img src={playStore} height="35" />
                    </a>
                  </div>
                </div>
              </div>
              <div className={cx(s["social-network-links"], "col-md-3 align-self-center")}>
                <ul className={cx("m-0")}>
                  <li>
                    <a href="https://www.facebook.com/lunajets" target="_blank" className="footer_social">
                      <Facebook size={30} color="#7F7F7F" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/lunajets" target="_blank" className="footer_social">
                      <Twitter size={30} color="#7F7F7F" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/lunajets-s-a-" target="_blank" className="footer_social">
                      <LinkedIn size={30} color="#7F7F7F" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/lunajets/" target="_blank" className="footer_social">
                      <Instagram size={30} color="#7F7F7F" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/user/lunajets" target="_blank" className="footer_social">
                      <Youtube size={30} color="#7F7F7F" />
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </section>

        <section className={cx(s["footer-end-second"])}>
          <div className={cx("container")}>
            {/* footer infos */}
            <div className={cx("row", s["company-infos"])}>
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
              <div className={cx("col-md-4 align-self-center", s["company-flag"])}>
                <i className={cx("famfamfam-flags", "ch")} />
                <span className={cx(s["company-based"])}>
                  <Text defaultMessage="A Swiss based company" id="client.footerEnd.swissBasedCompany" />
                </span>
                <span />
              </div>

              {/* legal */}
              <div className={cx("col-md-4 align-self-center", s["company-legal"])}>
                <ul>
                  <li>
                    <Link to="#" text="Data Privacy" id="client.footerEnd.link.dataPrivacy" />
                  </li>
                  <li>
                    <Link to="#" text="Terms & Conditions" id="client.footerEnd.link.termsConditions" />
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx("row", s["flight-broker"])}>
              <div className="col text-center">
                <Text defaultMessage={flightBroker} id="footer.flight.broker" />
              </div>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default withStyles(s)(FooterEnd);
