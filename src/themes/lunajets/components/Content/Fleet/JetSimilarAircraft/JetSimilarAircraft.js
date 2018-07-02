import React from "react";
import cx from "classnames";
import s from "./JetSimilarAircraft.scss";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import Text from "../../../Primitives/Text";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Carousel from "../../../Widgets/Carousel";
import Slider from "../../../Widgets/Slider";
import getMediaByIds from "./getMediaByIds.graphql";
import getSFAircraftModels from "./getSFAircraftModels.graphql";
import Loading from "react-loading-animation";
import getPosts from "./getPosts.gql";
import Button from "themes/lunajets/components/Primitives/Button";
import Link from "themes/lunajets/components/Primitives/Link";
import getUrlFromPost from "utils/getUrlFromPost";
import WrapperLink from "../../../Primitives/WrapperLink";
import history from 'core/history';

const slides = [
  {
    image: "https://picsum.photos/275/?random",
    description: "something"
  },
  {
    image: "https://picsum.photos/275/?random",
    description: "something"
  },
  {
    image: "https://picsum.photos/275/?random",
    description: "something"
  }
];

class JetSimilarAircraft extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true
    };
    this.fetchSimilarAircraft = this.fetchSimilarAircraft.bind(this);
  }

  componentDidMount() {
    this.fetchSimilarAircraft();
  }

  fetchSimilarAircraft = async () => {
    const {
      data: { jet }
    } = this.props;
    let newAircrafts = [];

    if (jet.meta.similar_aircraft_list) {
      var list_postId = [];
      jet.meta.similar_aircraft_list.map(aircraft => {
        list_postId.push(aircraft.post_uuid);
      });
      //Search Post
      const posts = await this.searchPost(list_postId);
      var list_sfid = [];
      var list_media = [];
      if (posts.length > 0) {
        posts.map(post => {
          if (post.meta && post.meta.aircraft_sfid) {
            list_sfid.push(post.meta.aircraft_sfid);
            list_media.push(post.media);
          }
        });

        const sfAircraftModels = await this.searchSimilarAircraft(list_sfid);
        if (sfAircraftModels.length > 0) {
          posts.map(simAircraft => {
            var matchedAircraft = sfAircraftModels.find(x => x.sfid === simAircraft.meta.aircraft_sfid);
            var matchedMedia = list_media && list_media.find(x => x.id === simAircraft.media.id);
            if (matchedMedia && matchedAircraft) {
              const newAircraft = {
                aircraft: matchedAircraft,
                media: matchedMedia,
                language: simAircraft.language,
                slug: simAircraft.slug,
                meta: simAircraft.meta
              };
              newAircrafts.push(newAircraft);
            }
          });
        }
      }
    }
    this.setState({
      data: newAircrafts,
      isFetching: false
    });
  };

  searchPost = id => {
    const { client } = this.context;

    if (id) {
      return new Promise((resolve, reject) => {
        client
          .query({
            query: getPosts,
            variables: {
              id: id
            }
          })
          .then(({ data }) => {
            resolve(data.posts);
          });
      });
    }
  };

  searchSimilarAircraft = sfid => {
    const { client } = this.context;
    if (sfid) {
      return new Promise((resolve, reject) => {
        client
          .query({
            query: getSFAircraftModels,
            variables: {
              sfid: sfid
            }
          })
          .then(({ data }) => {
            resolve(data.sfAircraftModels);
          });
      });
    }
  };

  searchMedia = id => {
    const { client } = this.context;
    if (id) {
      return new Promise((resolve, reject) => {
        client
          .query({
            query: getMediaByIds,
            variables: {
              id: id
            }
          })
          .then(({ data }) => {
            resolve(data.media);
          });
      });
    }
  };

  gotoPage(event, aircraft){
    const { locale } = this.props;
    history.push(getUrlFromPost(locale, aircraft));
  }

  render() {
    const { locale } = this.props;
    const aircrafts = this.state.data;

    if (aircrafts && aircrafts.length == 0) {
      return null;
    }

    let slides = [];
    if (aircrafts) {
      aircrafts.map(aircraft => {
        if (aircraft.aircraft && aircraft.media) {
          let slide = [];
          slide["image"] = aircraft.media.src;
          slide["description"] = aircraft.aircraft.name;
          slides.push(slide);
        }
      });
    }

    return (
      <Loading isLoading={this.state.isFetching}>
        <div className={cx("container mt-5", s["similar-aircraft"])}>
          <div className="row">
            <div className="col">
              <h2 className={"section-title lt-blue"}>
                <Text id="client.home.similarAircraft" defaultMessage="Similar Aircraft" />
              </h2>
            </div>
          </div>

          {/* desktop only */}
          <div className="row my-5 d-none d-md-flex">
            {aircrafts
              ? aircrafts.slice(0, 3).map(aircraft => (
                  <div className={cx("col-sm-4 col-12", s["plane-infos"])} key={aircraft.sfid} onClick={(e) => this.gotoPage(e, aircraft)}>
                    <FixedRatioImage
                      className={s["plane-illustration"]}
                      image={aircraft.media.src}
                      ratio={0.6}
                      alt={aircraft.aircraft.name}
                      title={aircraft.aircraft.name}
                    />
                    <div className={s["plane-description"]}>
                      <div className={s["plane-name"]}>
                        <WrapperLink className={cx(s.name)} pathUrl={`${getUrlFromPost(locale, aircraft)}`}>
                          {aircraft.aircraft.name}
                        </WrapperLink>                        
                      </div>
                    </div>                    
                  </div>
                ))
              : null}
          </div>
          {/* mobile only */}
          <div className={cx("row my-5 d-md-none", s["aircraft-slider"])}>
            <div className="col">
              <Carousel slides={slides} slidesToShow={1} slidesToScroll={1} />
            </div>
          </div>

          <div className={cx("container")}>
            <div className={cx("row justify-content-center")}>
              <div className={cx("col-md-4 col-12", s["browse-button"])}>
                <Link
                  className={cx("btn btn-outline-primary w-100", s.button)}
                  to="/#"
                  text="BROWSE FLEET"
                  id="client.jet-similar-aircraft.browse-fleet"
                />
              </div>
            </div>
          </div>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(JetSimilarAircraft));
