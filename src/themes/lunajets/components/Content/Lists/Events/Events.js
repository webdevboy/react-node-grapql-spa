import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import history from 'core/history';
import s from "./Events.scss";
import queryGetEvents from "./queryGetEvents.graphql";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import getUrlFromPost from "utils/getUrlFromPost";
import moment from "moment/moment";

class Events extends Component {
  constructor(props) {
    super(props);
	  const { data } = props;
    this.handleDiscoverMore = this.handleDiscoverMore.bind(this);
	  this.state = {
      posts: [],
      display: 1,
      maxNum: 10,
   };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    let newState = this.state;
    newState.posts = nextProps.data.posts;
    this.setState(newState);
  }


  handleDiscoverMore() {
    this.setState({
      ...this.state,
      maxNum: this.state.maxNum + 10
    });
  }

  render() {
    if (!this.state.posts) {
      return (<LoadingSpinner />)
    }

    var posts = this.state.posts.filter (post => {
      var fromDate = moment(post.meta.from_date);
      var toDate = moment(post.meta.to_date);
      var monthCheck = true;
      var yearCheck = true;
      if (this.props.month !== "" && this.props.month !== undefined ) {
        if ((fromDate.month() !== this.props.month) && (toDate.month() !== this.props.month)) {
          monthCheck = false;
        }
      }

      if (this.props.year !== "" && this.props.year !== undefined ) {
        if ((fromDate.year() !== this.props.year) && (toDate.year() !== this.props.year)) {
          yearCheck = false;
        }
      }

      return (monthCheck && yearCheck);
    });

    posts = _.sortBy(posts, post => post.meta.from_date);

    const displayValue = this.state.display;
    const widths = [4, 1, 1, 1, 1, 2, 3, 1, 1, 3];

    return (
      <div className={cx("w-100 w-full")}>
        <div className={cx('pb-3', s["event-container"])}>
          {
            posts.map((event, index) => index < this.state.maxNum ?
            (
              <div className={cx(s[`event-card-${widths[index % 10]}`], s['event-card'])}>
                <div className={cx(s.archive)}>
                  {event.media ? (<img src={event.media.src} className={cx("w-100", s["event-image"])}/>) : null}
                  <div className={widths[index % 10] == 4 || widths[index % 10] == 3 ? cx(s.videoplaceholder, "col-lg-6 col-sm-12") : cx(s.videoplaceholder, "col-lg-12 col-sm-12")}>
                    <a className={cx()} href={`${getUrlFromPost(event.language.locale, event)}`}>
                      <Text id={`event${index}`} defaultMessage={event.title} />
                    </a>
                  </div>
                </div>
              </div>) : null
            )
          }
        </div>
        {/* button discover more */}
        {this.state.maxNum < posts.length ? (
            <div className="row">
              <div className="col-sm-4 col-12 offset-sm-4">
                <a className={cx("btn btn-outline dk-blue w-100")} onClick={this.handleDiscoverMore}>
                  <Text defaultMessage="load more" id="client.news.button.loadmore" />
                </a>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {

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
    language_id: language_id,
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(
  graphql(queryGetEvents, {
    options: (ownProps) => ({
      variables: {
        type: "event",
        language_id: ownProps.language_id,
      },
	  notifyOnNetworkStatusChange: true,
    }),
  })(Events),));
