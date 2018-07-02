import React from "react";
import cx from "classnames";
import s from "./EmptyLegsDetailSlides.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Loading from "react-loading-animation";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Text from "../../../Primitives/Text";
import Carousel from "../../../Widgets/Carousel";
import queryGetAircraftPost from "./queryGetAircraftPost.graphql";
import queryGetMedias from "./queryGetMedias.graphql";
import { connect } from "react-redux";
import { graphql, Query } from "react-apollo";
import getUrlFromPost from "utils/getUrlFromPost";

const slides = [
  {
    image: "https://picsum.photos/1350/750/?image=257",
    description: "something",
  }
];

class EmptyLegsDetailSlides extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {
      display: 1,
      postSlide: [],
      aircraftUrl: "/",
   };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) { }

  render() {
    const { data: { post } } = this.props;
    const emptyLeg = this.props.emptyLeg;
    const ids = post && post.meta && post.meta.aircraft_gallery ? post.meta.aircraft_gallery.map(v => v.id) : [];
    const aircraftUrl = post && post.language ? getUrlFromPost(post.language.locale, post) : '/';

    return (
      <Query query={queryGetMedias} variables={{ ids }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            const slides = [{
              image: post && post.media ? post.media.src : {},
              decription: post ? post.title : ''
            }];
            data.medias.map(galleryImage => {
              slides.push({
                image: galleryImage.src,
                decription: galleryImage.key
              });
            });

            return (
              <div className={cx(s["emptylegs-detail-slides"])}>
                <div className={cx("container")}>
                  <div className={cx("row")}>
                    <div className={cx("col")}>
                      <div className="section-title lt-blue">
                        <Text defaultMessage="Aircraft details" id="emptylegs.details.slides.title" />
                      </div>
                      <h1 className="section-heading">{emptyLeg.aircraft.name}{/* TODO: Replace by real data  */}</h1>
                    </div>
                  </div>
                </div>
                <div className={cx("container-fluid")}>
                  <div className="row my-5">
                    <div className="col p-0">
                      <Carousel slides={slides} slidesToShow={1} slidesToScroll={1} />
                    </div>
                  </div>
                </div>

                <div className={cx("container")}>
                  <div className={cx("row")}>
                    <div className={cx("col")}>
                      <a className={cx()} href={aircraftUrl}>
                        <button className="btn btn-outline red conduit mx-auto">
                          <Text defaultMessage="Discover" id="client.emptyLegDetails.aircraftDiscoverButton" suffixMessage={emptyLeg.aircraft.name}/>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {

  const currentLocale = state.intl.locale;
  const availableLocales = state.runtime.availableLocales;
  let language_id = false;

  for (var key in availableLocales) {
    if (availableLocales.hasOwnProperty(key)) {
        if (availableLocales[key].locale === currentLocale) {
          language_id = availableLocales[key].id;
        }
    }
  }

  return {
    language_id : language_id,
    locale : currentLocale,
  };
};


export default connect(mapStateToProps)(withStyles(s)(
  graphql(queryGetAircraftPost, {
    options: (ownProps) => ({
      variables: {
        post_id: ownProps.emptyLeg.details.aircraftPost_post_id,
        language_id: ownProps.language_id,
      },
	    notifyOnNetworkStatusChange: true,
    }),
  })(EmptyLegsDetailSlides),));
