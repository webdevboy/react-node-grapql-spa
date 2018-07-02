import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import SectionTitle from "../../../Layout/SectionTitle";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import history from 'core/history';
import s from "./Archives.css";

const QUERY = gql`query($id: ID!) { 
  article: getArticle(id: $id) { id, title, summary, body }
}`;

class Archives extends Component {

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    // const { data: { articles }, linkToDetail } = this.props;
    const archives = [
      {
        source: '',
        description: 'Blandit messa enim nec dui'
      },
      {
        source: '',
        description: 'Blandit messa enim nec dui'
      },
      {
        source: '',
        description: 'Blandit messa enim nec dui'
      },
      {
        source: '',
        description: 'Blandit messa enim nec dui'
      }
    ];

    const moreArchiveButton = "DISCOVER MORE";
    const widths = [8,4,4,8];
    
    return (
      <div className={s.root}>
        <div className="row mt-5 mb-5">
          <SectionTitle textId="client.page.media.center.archives.sectionTitle" defaultMessage="Archives" hx="2" />
        </div>
        <div className='row pb-3'>
          {
            archives.map((v, index) => 
                <div className={`col-lg-${  widths[index % 4]  } col-sm-12`}>
                  <div className={widths[index % 4] == 8 ? cx(s.archive, s.pt50, "my-2"): cx(s.archive, "my-2")}>
                    <div className={widths[index % 4] == 8 ? cx(s.videoplaceholder, s.width48, "col-lg-6 col-sm-12") : cx(s.videoplaceholder, "col-lg-12 col-sm-12")}>
                      <Text id={`videodescription${  index}`} defaultMessage={v.description} />
                    </div>
                  </div>
                </div>
            )
          }
        </div>
        <div className="row pt-5 pb-5">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <a className="btn btn-outline dk-blue w-100 col-lg-4 mx-2 my-2">
              <Text id="downloadbutton" defaultMessage={moreArchiveButton} />
            </a>
          </div>
          <div className="col-lg-4" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default withStyles(s)(Archives);

