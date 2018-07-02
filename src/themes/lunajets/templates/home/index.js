import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { Query } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import { ArrowRight } from "react-feather";
import RichMediaHeader from "../../components/Layout/RichMediaHeader";
import RequestFlight from "../../components/Forms/RequestFlight";
import Text from "../../components/Primitives/Text";
import RichText from "../../components/Primitives/RichText";
import Image from "../../components/Primitives/Image";
import VideoUpdater from "../../components/Primitives/VideoUpdater";
import Testimonials from "../../components/Content/Lists/Testimonials";
import NearbyEmptyLegs from "../../components/Content/Lists/NearbyEmptyLegs";
import TrendingLocations from "../../components/Content/Lists/TrendingLocations";
import CertificationsBlock from "../../components/Content/Home/CertificationsBlock";
import AsSeenOn from "../../components/Content/Home/AsSeenOn";

import background from "./gfx/background.jpg";
import service from "./gfx/service.svg";
import price from "./gfx/price.svg";
import smart from "./gfx/smart.svg";
import appStore from "./gfx/app-store-badge.svg";
import playStore from "./gfx/play-store-badge.svg";

import s from "./home.css";
import Page from "../page";

import GET_POSTS from "../../queries/getReviewPosts.gql";
import { openFlyNow } from "../../actions/ui";

class Home extends Component {
  static contextTypes = {
    query: PropTypes.object,
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLimit: 3,
      clear: false,
    };
  }

  displayFlyNow = e => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow", () => {
      this.props.openFlyNow();
    });
  };

  componentDidMount = () => {
    console.log('PAGE WILL MOUNT',this.context);
    if (this.context.query.newsletter_subscription) {
      this.timeout = setTimeout(() => {
        this.setState({
          clear: true
        })
      }, 5000);
    }

  }

  componentWillUnmount = () => {
    clearInterval(this.timeout);
  }

  render() {
    const { post, isHomePage } = this.props;
    const src = post.media ? post.media.src || background : background;

    const options = {
      header: {
        request_flight: false,
        navbar: {
          isHomePage,
        },
      },
    };

    const video = "https://www.youtube.com/watch?v=Dlg0D6s6aLw";
    const query = {
      language_id: this.props.language_id,
      featured_homepage: true,
      pagination: {
        offset: 0,
        limit: this.state.currentLimit,
      },
    };
    return (
      <Page {...options}>

        { (this.context.query.newsletter_subscription === '1' && !this.state.clear) ? <div className={s.popup}><h1>Thank You for subscribing</h1></div> : null }
        { (this.context.query.newsletter_subscription === '0' && !this.state.clear) ? <div className={s.popup}><h1>Unsubscribed Sucessfully!</h1><p>Fare Well my dear user</p></div> : null }
        { (this.context.query.account_activation === 1 && !this.state.clear) ? <div className={s.popup}><h1>Thank you for registering!</h1></div> : null }
        
        <RichMediaHeader id="client.home.image.header" defaultSrc={src}>
          <RequestFlight isHomePage={this.props.isHomePage} />
        </RichMediaHeader>
        {/* how it work section */}
        <div className="container lj-pad-y-50 lj-pad-t-100">
          <div className={cx("row")}>
            <div className={cx("col")}>
              <div className="row">
                <div className="col">
                  <Text className="section-title corporate-blue" defaultMessage="How It Works" id="client.home.howItWorks" h2/>
                </div>
              </div>

              <div className="row">
                {/* service */}
                <div className={cx("col-lg-4 flex-column my-4 my-md-0", s.feature)}>
                  <div className={cx("d-flex justify-content-center", s.icon)}>
                    <Image source={service} alt="service" title="service" />
                  </div>
                  <h4 className="d-flex justify-content-center">
                    <Text defaultMessage="SERVICE" id="client.home.howItWorks.service" />
                  </h4>
                  <p className="paragraph conduit">
                    <RichText id="client.home.howItWorks.service.paragraph" />
                  </p>
                </div>

                {/* smart */}
                <div className={cx("col-lg-4 flex-column my-4 my-md-0", s.feature)}>
                  <div className={cx("d-flex justify-content-center", s.icon)}>
                    <Image source={smart} alt="smart" title="smart" />
                  </div>
                  <h4 className="d-flex justify-content-center">
                    <Text defaultMessage="SMART" id="client.home.howItWorks.smart" />
                  </h4>
                  <p className="paragraph conduit">
                    <RichText id="client.home.howItWorks.smart.paragraph" />
                  </p>
                </div>

                {/* price */}
                <div className={cx("col-lg-4 flex-column my-4 my-md-0", s.feature)}>
                  <div className={cx("d-flex justify-content-center", s.icon)}>
                    <Image source={price} alt="price" title="price" />
                  </div>
                  <h4 className="d-flex justify-content-center">
                    <Text defaultMessage="PRICE" id="client.home.howItWorks.price" />
                  </h4>
                  <p className="paragraph conduit">
                    <RichText id="client.home.howItWorks.price.paragraph" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile app section */}
        <div className="container lj-pad-y-50">
          <div className={cx("row")}>
            <div className="col">
              <div className="row">
                <div className="col-lg-7 section-heading">
                  <Text className="section-title corporate-blue" defaultMessage="Mobile App" id="client.home.mobileApp" h2/>
                  <Text className="section-heading-1" defaultMessage="Private Jet At Your FingerTips" id="client.home.mobileApp.jetAtFingerTips" strong />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7">
                  <p className="section-paragraph conduit">
                    <RichText id="client.home.mobileApp.jetAtFingerTips.paragraph" />
                  </p>
                </div>
                <div className={cx("d-flex col-lg-5 py-4 py-md-0 align-items-center", s.videoCol)}>
                  <VideoUpdater post={post} defaultVideo={video} />
                </div>

                <div className="col-12">
                  <div className={cx(s.badges)}>
                    <div className={cx(s.badge)}>
                      <a href="https://itunes.apple.com/app/lunajets-private-jets/id462220739" target="_blank">
                        <img src={appStore} />
                      </a>
                    </div>
                    <div className={cx(s.badge)}>
                      <a href="https://play.google.com/store/apps/details?id=com.abonobo.lunajets" target="_blank">
                        <img src={playStore} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
          <div className="row lj-row justify-content-end">
            <button className={s.lastminute} id="last_minute_flight" onClick={e => this.displayFlyNow(e)}>
              <Text
                defaultMessage="Last minute flights, take off in 60 min or less!"
                id="client.home.lastMinuteFlights.takeOffIn60MinOrLess"
              />
              <ArrowRight color="#FFF" />
            </button>
          </div>
        </div> */}
        <AsSeenOn post={post} />
        <CertificationsBlock />
        <Query query={GET_POSTS} variables={query} fetchPolicy="cache-and-network">
          {({ error, data, fetchMore }) => {
            if (error) return `Error!: ${error}`;
            return (
              <Testimonials
                reviews={data.posts}
                viewMore={() =>
                  fetchMore({
                    variables: {
                      pagination: {
                        offset: data.posts.length,
                        limit: this.state.currentLimit,
                      },
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        posts: [...prev.posts, ...fetchMoreResult.posts],
                      });
                    },
                  })
                }
              />
            );
          }}
        </Query>
        <NearbyEmptyLegs />
        <TrendingLocations />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const currentLocale = state.intl.locale;
  const { availableLocales } = state.runtime;
  const currentLanguage = Object.values(availableLocales).find(locale => locale.locale === currentLocale);
  const language_id = currentLanguage ? currentLanguage.id : "";
  return {
    language_id,
    locale: currentLocale,
  };
};

export default connect(mapStateToProps, { openFlyNow })(withStyles(s)(Home));
