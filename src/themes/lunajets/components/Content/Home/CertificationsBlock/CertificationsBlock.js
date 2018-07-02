import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import moment from "moment";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import RichImage from "../../../Primitives/RichImage";
import s from "./style.css";

import argus from "./gfx/argus.png";
import BACA from "./gfx/BACA.png";
import EBAA from "./gfx/EBAA.png";
import NBAA from "./gfx/NBAA.png";
import pci from "./gfx/pci.png";

export class CertificationsBlock extends Component {
  render() {
    return (
      <div className={cx(s.certifications, "container-fluid lj-pad-y-50")}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className={"section-title lt-blue"}>
                <a name="accreditations" />
                <a name="affiliations" />
                <a name="accreditations" />
                <a name="akkreditierungen" />
                <a name="accreditamenti" />
                <a name="akkreditaciok" />
                <a name="acreditaciones" />
                <a name="acreditacoes" />
                <a name="akredytacje" />
                <Text
                  className={"section-title lt-blue"}
                  defaultMessage="Certifications"
                  id="client.home.certifications"
                  h2
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 section-heading">
              <Text
                className={"section-heading-1  white"}
                defaultMessage="The first non US booking platform to be ARGUS certified"
                id="client.home.certifications.firstArgus"
                strong
              />
            </div>
            <div className="col-lg-4 my-2">
              <p className={s.certificationInspection}>
                <Text
                  defaultMessage="Following inspection by an independent in-house audit. This certification testifies to the excellent professional procedures, operator ratings and code of ethics used at LunaJets."
                  id="client.home.certifications.certificationInspection"
                />
              </p>
            </div>
          </div>

          <div className="row py-4">
            <div className="col d-flex flex-column flex-lg-row align-items-center justify-content-between">
              <div className={cx(s.certimg, "py-4")}>
                <RichImage
                  to="#"
                  text="Argus certified"
                  title="Argus certified"
                  id="client.home.certification.ArgusCertified"
                  src={argus}
                  targetBlank={true}
                />
              </div>
              <div className={cx(s.certimg, "py-4")}>
                <RichImage
                  to="#"
                  text="PCI-SSD certified"
                  title="PCI-SSD certified"
                  id="client.home.certification.PciDssCertified"
                  src={pci}
                  targetBlank={true}
                />
              </div>
              <div className={cx(s.certimg, "py-4")}>
                <RichImage
                  to="#"
                  text="EBAA certified"
                  title="EBAA certified"
                  id="client.home.certification.EbaaCertified"
                  src={EBAA}
                  targetBlank={true}
                />
              </div>
              <div className={cx(s.certimg, "py-4")}>
                <RichImage
                  to="#"
                  text="BACA certified"
                  title="BACA certified"
                  id="client.home.certification.BacaCertified"
                  src={BACA}
                  targetBlank={true}
                />
              </div>
              <div className={cx(s.certimg, "py-4")}>
                <RichImage
                  to="#"
                  text="NBAA certified"
                  title="NBAA certified"
                  id="client.home.certification.NbaaCertified"
                  src={NBAA}
                  targetBlank={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CertificationsBlock);
