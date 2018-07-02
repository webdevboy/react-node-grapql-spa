import React, { Component, Fragment } from "react";
import _ from "lodash";
import cx from "classnames";
import moment from "moment";
import { Query } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./EvergreenSlider.css";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { FormattedDate } from "react-intl";
import gql from "graphql-tag";
import Slider from "themes/lunajets/components/Widgets/Slider";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import QUERY_GET_DATA from "./getSliderData.graphql";

class EvergreenSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = nextProps.data;
    let slides = [];
    posts.forEach(post => slides.push({ image: post.media.src, description: post.title }));
    this.setState({
      slides: slides
    });
  }

  render() {
    const { slides } = this.state;
    if (slides.length === 0) return null;
    return <Slider slides={slides} />;
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
    locale: currentLocale
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(
    graphql(QUERY_GET_DATA, {
      options: ownProps => ({
        variables: {
          language_id: ownProps.language_id
        },
        notifyOnNetworkStatusChange: true
      })
    })(EvergreenSlider)
  )
);
