import React from 'react';
import cx from 'classnames';
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import s from './MapListAirport.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from '../../../Primitives/Text';
import Map from '../../../Widgets/MapBox';
import PropTypes from "prop-types";
import _ from 'lodash';
import ArrowRight from 'react-feather/dist/icons/arrow-right';
import GET_POSTS from "../../../../queries/getPostsByIds.graphql";
import MapListDisplay from "../MapListDisplay";
const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";


class MapListAirport extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      listAirport: [],
      isFetching: true
    }
  }
  render() {
    const {defaultTitle, titleId, fixedText, lastTextId, lastTextDefault} = this.props;
    let ids;

    if (this.props.data) {
      ids = this.props.data.airportIds || this.props.data.heliportIds;
    } else {
      ids = this.props.airportIds;
    }

    return (
      <Query query={GET_POSTS} variables={{ ids }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          return (
            <div>
              {data && data.posts && data.posts.length > 0 &&
                <MapListDisplay isFetching={false} data={data} defaultTitle={defaultTitle} titleId={titleId} fixedText={fixedText} lastTextId={lastTextId} lastTextDefault={lastTextDefault} />
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default (withStyles(s)(MapListAirport));
