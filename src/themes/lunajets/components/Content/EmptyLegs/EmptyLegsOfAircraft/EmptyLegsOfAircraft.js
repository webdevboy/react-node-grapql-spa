import React from 'react';
import { FormattedDate } from 'react-intl';
import cx from 'classnames';
import s from './EmptyLegsOfAircraft.css';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from '../../../Primitives/Text';
import EmptyLegsFilter from '../EmptyLegsFilter';
import EmptyLegsResultWithFilter from '../EmptyLegsResultWithFilter';
import LoadingSpinner from 'themes/lunajets/components/Widgets/LoadingSpinner';
import queryGetEmptyLegs from './queryGetEmptyLegs.graphql';
import { Query } from "react-apollo";
import Promise from 'bluebird';


class EmptyLegsOfAircraft extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };
  // This component is used to manage the search of empty legs and the result's display
  constructor(props) {
    super(props);
    this.state = {
	  view: 'list',
    };
  }

  render() {
	const {aircraft_sfid} = this.props;
    return (
      <React.Fragment>
	    <Query query={queryGetEmptyLegs} variables={{ aircraft_sfid: aircraft_sfid }}>
		  {({ loading, data, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return null;
                  const { emptylegs } = data;
                  return <EmptyLegsResultWithFilter isFetching={false} emptylegs={emptylegs} view={this.state.view} />;
          }}
		</Query>
      </React.Fragment>
    );
  }
}


export default (withStyles(s)(EmptyLegsOfAircraft));
