import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import { connect } from "react-redux";
import s from "./AirportCard.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../../Primitives/Text";
import Link from "../../../../Primitives/Link";
import DraftjsDecoder from 'utils/DraftjsDecoder';
import getUrlFromPost from "utils/getUrlFromPost";

class AirportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { locale } = this.props;
    const {
      city, full_name, iata, icao, name, post,
    } = this.props.airport;

    const postJson = JSON.parse(post);
    
    let jsonBody;
    if (typeof postJson.body.main === "string") {
      jsonBody = postJson.body.main;
    } else {
      jsonBody = JSON.stringify(postJson.body.main);
    }

    const subSummary = postJson.meta ? postJson.meta.summary : '';

    return (
      <div className={s["card"]}>
        <div className="row">
          <div className={cx('col lt-blue uppercase', s["subtitle"])}>
            <Text id="client.airport-map.airport-card.subtitle" defaultMessage={name} editable={false}/>
          </div>
        </div>

        <div className="row">
          <div className={cx('col')}>
            <h2 className={cx('white', s["title"])}>
              <Text id="client.airport-map.airport-card.title" defaultMessage={`${iata}, ${icao}`} />
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p className={cx("section-sub-heading-paragraph white", s["text"])}>
              {subSummary}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <Link id={`client.airport-map.airport-card.link1.${post.id}`} fixedLink={true} to={`${getUrlFromPost(locale, postJson)}`} className={cx("btn btn-outline link_airport lt-blue d-none d-sm-flex", s["btn-view"])} text={`More about the ${name} airport`} />
            <Link id={`client.airport-map.airport-card.link2.${post.id}`} fixedLink={true} to={`${getUrlFromPost(locale, postJson)}`} className={cx("btn btn-outline link_airport lt-blue d-sm-none", s["btn-view"])} text={`VIEW MORE`} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(AirportCard));
