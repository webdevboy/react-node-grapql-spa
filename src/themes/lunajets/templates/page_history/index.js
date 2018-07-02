import React, { Component } from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import Header from "../../components/Layout/Header";
import Histories from "../../components/Content/Lists/Histories";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import background from "./gfx/background.jpg";
import service from "./gfx/services.svg";
import price from "./gfx/price.svg";
import smart from "./gfx/smart.svg";
import video from "./gfx/big_buck_bunny.mp4";
import appStore from "./gfx/app-store-badge.svg";
import playStore from "./gfx/play-store-badge.svg";
import { ArrowRight } from "react-feather";
import s from "./history.css";
import Page from "../page";

class History extends Component {
  static contextTypes = {
    query: PropTypes.object,
    params: PropTypes.object,
  };

  constructor() {
    super();
  }

  render() {
    const { hreflangs } = this.props;
    const { post } = this.props;
    let jsonBody;
    const body = post.body && post.body.main || {};
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }
    const heading = {
      subtitle: {
        defaultMessage: 'OUR STORY',
        id: "client.history.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };
    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <SectionDescription section={heading} />
        <Histories histories={post.meta && post.meta.history} />
      </Page>
    );
  }
}

export default withStyles(s)(History);
