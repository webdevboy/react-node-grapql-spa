import React, { Component } from "react";
import { connect } from "react-redux";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import Page from "../page";
import Header from "themes/lunajets/components/Layout/Header";
import background from "../home/gfx/corporate-detail-bg.png";
import { AlsoInteresting } from "../../components/Content/Home/AlsoInteresting/AlsoInteresting";
import NewsBanner from "themes/lunajets/components/Content/Detail/Article/NewsBanner";
import ArticleDescription from "themes/lunajets/components/Content/Detail/Article/ArticleDescription";
import GET_POSTS from "../../../../client/routes/queries/queryGetPosts.gql";
import cx from "classnames";
import s from "./page.css";
import DraftjsDecoder from "utils/DraftjsDecoder";

class PageGeneric extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hreflangs, post } = this.props;

    let jsonBody;
    const body = post.body ? post.body.main : {};
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const article = {
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: `client.singleArticle.title.${post.slug}`,
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    return (
      <div>
        <Page post={post} hreflangs={hreflangs}>
          {post.media && post.media.src && <Header background={post.media && post.media.src} />}
          <div className={cx(s["page-generic"], "lj-pad-y-100")}>
            <div className={cx("container")}>
              {/* Paragraph */}
              <div className={cx("row")}>
                <h1 className={cx("col", "section-heading")}>{post.title.toUpperCase()}</h1>
              </div>

              <div className={cx("row")}>
                <div className={cx("col paragraph conduit")}>
                  <p>{jsonBody && <DraftjsDecoder contentState={jsonBody} />}</p>
                </div>
              </div>
            </div>
          </div>
        </Page>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PageGeneric);
