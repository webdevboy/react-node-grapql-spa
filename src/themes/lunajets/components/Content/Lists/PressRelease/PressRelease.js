import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SectionTitle from "../../../Layout/SectionTitle";
import Text from "../../../Primitives/Text";
import history from 'core/history';
import s from "./PressRelease.css";

const QUERY = gql`query($id: ID!) { 
  article: getArticle(id: $id) { id, title, summary, body }
}`;

class PressRelease extends Component {

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    const { releases } = this.props;

    const releaseButtons = {
        pressButton: "ALL PRESS RELEASES",
        downloadButton: "DOWNLOAD OUR MEDIA KIT"
      }
    
    return (
      <div className={s.root}>
        <div className="row mt-5 mb-5">
          <SectionTitle textId="client.page.pressRelease.sectionTitle" defaultMessage="Latest Press Release" hx="2" />
        </div>
        {
          releases.map((release, index) => 
            <div className='row pb-3'>
              <div className="col-lg-12">
                <p className={cx(s.releasediv, "text-blue align-middle pl-4")}>
                  <Text id={`press-release${  index}`} defaultMessage={release.title} />
                  <i className={cx(s.arrowicon, "fa fa-long-arrow-right")} />
                </p>
              </div>
            </div>
          )
        }
        <div className="row pt-5">
          <div className="col-lg-2" />
          <a className="btn btn-outline dk-blue w-100 col-lg-4 mx-2 my-2">
            <Text id="pressbutton" defaultMessage={releaseButtons.pressButton} />
          </a>
          <a className="btn btn-outline dk-blue w-100 col-lg-4 mx-2 my-2">
            <Text id="downloadbutton" defaultMessage={releaseButtons.downloadButton} />
          </a>
          <div className="col-lg-2 col-md-2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default withStyles(s)(PressRelease);

