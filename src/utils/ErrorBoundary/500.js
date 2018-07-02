import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./500.css";
import Text from "../../themes/lunajets/components/Primitives/Text";
import TextHtml from "../../themes/lunajets/components/Primitives/TextHtml";
import Link from "../../themes/lunajets/components/Primitives/Link";
import Image from "../../themes/lunajets/components/Primitives/Image";
import logo from "./gfx/logo.svg";

class TechnicalIssuePage extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={cx(s.container, "container")}>
          <h1 className={cx(s.title, "conduit")}>
            <Text id="client.404.oops" defaultMessage="OOPS!" pencilStyle={{ top: "50px", right: "-40px" }} />
          </h1>
          <div className={s.msgwrapper}>
            <p className={s.msg}>
              <Text id="client.500.technical-issue" defaultMessage="There is a technical issue occured on our side." />
            </p>
            <span className={cx(s.errorcode, "conduit")}>
              <Text id="client.500.error-code" defaultMessage="Error code : 500" />
            </span>
          </div>

          <div className={s.mainaction}>
            <a href="/" className="btn lt-red mx-auto">
              <Text id="client.404.continue-to-home" defaultMessage="Continue to home" />
            </a>
          </div>

          <div className={cx("row", s.links)}>
            <Link to="#" className={"conduit col-12 col-md-4"} text="Book a flight" id="client.404.book-a-flight" />
            <Link
              to="#"
              className={"conduit col-12 col-md-4"}
              text="Search for empty legs"
              id="client.404.search-empty-legs"
            />
            <Link to="#" className={"conduit col-12 col-md-4"} text="Contact Us" id="client.404.contact-us" />
          </div>

          <div className={s.logo}>
            <Image source={logo} width="100px" height="20px" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TechnicalIssuePage);
