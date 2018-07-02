import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import history from 'core/history';
import s from "./News.scss";
import GET_POSTS from '../../../../../../client/routes/queries/queryGetPosts.gql';
import getUrlFromPost from "utils/getUrlFromPost";
import moment from "moment/moment";

class News extends Component {

  constructor(props) {
    super(props);

    this.setMax = this.setMax.bind(this);

    this.state = {
      maxNum: 10
    };
  }

  componentDidMount() {
    // console.log(this.props);
  }

  setMax() {
    this.setState({
      maxNum: this.state.maxNum + 10
    });
  }

  render() {
    var { news, locale } = this.props;
    const widths = [4, 1, 1, 1, 1, 2, 3, 1, 1, 3];

    return (
      <div className={cx("w-100 w-full")}>
        <div className={cx('pb-3', s["news-container"])}>
          {
            news.map((v, index) => index < this.state.maxNum ?
              <div className={cx(s[`news-card-${widths[index % 10]}`], s['news-card'])}>
                <div className={cx(s.archive)}>
                  {v && v.media ? (<img src={v.media.src} className={cx("w-100", s["news-image"])}/>) : null}
                  <div className={widths[index % 10] == 4 || widths[index % 10] == 3 ? cx(s.videoplaceholder, "col-lg-6 col-sm-12") : cx(s.videoplaceholder, "col-lg-12 col-sm-12")}>
                    <Link to={getUrlFromPost(locale, v)}>
                      <span className={s.text}>{v.title}</span>
                    </Link>
                  </div>
                </div>
              </div> : null
            )
          }
        </div>
        {
          this.state.maxNum < news.length ?
          <div className="row">
            <div className="col-sm-4 col-12 offset-sm-4">
              <a className={cx("btn btn-outline dk-blue w-100")} onClick={this.setMax}>
                <Text defaultMessage="load more" id="client.news.button.loadmore" />
              </a>
            </div>
          </div> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default withStyles(s)(News);

