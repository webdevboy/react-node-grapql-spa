import React, { Component } from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import cx from "classnames";
import LoadingSpinner from "themes/lunajets/components/Widgets/LoadingSpinner";
import Header from "themes/lunajets/components/Layout/Header";
import RequestFlight from "themes/lunajets/components/Forms/RequestFlight";
import background from "../home/gfx/background.jpg";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import CharterVsEmptyLeg from "themes/lunajets/components/Content/Detail/Charter/CharterVsEmptyLeg";
import JetDetailMap from "themes/lunajets/components/Content/Fleet/JetDetailMap";
import JetCabinComparator from "themes/lunajets/components/Content/Fleet/JetCabinComparator";
import AircraftModelList from "../../components/Content/Fleet/AircraftModelList";
import AircraftComparison from "themes/lunajets/components/Content/Fleet/AircraftComparison";
import AircraftSearchBox from "themes/lunajets/components/Content/Fleet/AircraftSearchBox";
import AircraftContainer from "themes/lunajets/components/Content/Fleet/AircraftContainer";
import Page from "../page";
import { Query, graphql } from "react-apollo";
import _ from "lodash";
import GET_AIRCRAFT_POSTS from "../../queries/getAircraftsForJetComparator.gql";
import GET_AIRCRAFT_TAXONOMIES from "../../queries/getAircraftTaxonomies.gql";
import GET_SF_AIRCRAFTS_CATEGORIES_MANUFACTURERS from "../../queries/getSFAircraftsCategoriesManufacturers.gql";

// comparator
// import {
//   getAircraftTaxonomies,
// } from "../../actions/data";

export class PageJetComparator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comparedAircrafts: [],
      category: "",
      manufacturer: "",
      title: "",
    };
  }

  sortByDisplayedFirst = (posts) => {
    const clonePosts = [...posts];
    const { displayedFirstOrder = [] } = this.props.post.meta;
    const result = [];
    displayedFirstOrder.forEach(post_id => {
      const indexFound = clonePosts.findIndex(post => post.post_id === post_id);
      if (indexFound !== -1) {
        const [ postFound ] = clonePosts.splice(indexFound, 1);
        result.push(postFound);
      }
    });
    return result.concat(clonePosts);
  }

  onSearch = (category, manufacturer, title) => {
    this.setState({
      category: category ? category.sfid : "",
      manufacturer: manufacturer ? manufacturer.sfid : "",
      title,
    });
  };

  removeAircraft = id => {
    const aircrafts = this.state.comparedAircrafts.filter(a => a.id !== id);
    this.setState({
      comparedAircrafts: aircrafts,
    });
  };

  changeOption = (val) => {
    const aircrafts = this.state.comparedAircrafts;
    const checkedIndex = _.findIndex(this.state.comparedAircrafts, a => {
      return a.id === val.value.id;
    });
    if (checkedIndex < 0 && val.checked) {
      aircrafts.push(val.value);
      this.setState({
        comparedAircrafts: aircrafts,
      });
    } else if (checkedIndex > -1 && !val.checked) {
      aircrafts.splice(checkedIndex, 1);
      this.setState({
        comparedAircrafts: aircrafts,
      });
    }
  };

  render() {
    const {
      post,
      hreflangs,
      data: { categories, manufacturers },
    } = this.props;
    const { category, manufacturer, title } = this.state;

    let jsonBody;
    const body = post.body ? post.body.main : "";
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: "private jet comparator",
        id: "client.jetcomparator.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const rCategories = categories
      ? categories.map(category => ({
          name: category.name,
          sfid: category.sfid,
          order: category.order,
        }))
      : [];

    const rManufacturers = manufacturers
      ? manufacturers.map(manufacture => ({
          name: manufacture.name,
          sfid: manufacture.sfid,
          order: manufacture.order,
        }))
      : [];

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media ? post.media.src : ''} />
        <SectionDescription section={heading} />
        <AircraftSearchBox onSearch={this.onSearch} categories={rCategories} manufacturers={rManufacturers} />
        <Query
          query={GET_AIRCRAFT_POSTS}
          variables={{
            category_sfids: rCategories.map(category => category.sfid),
            manufacturer_sfids: rManufacturers.map(manufacturer => {
              manufacturer.sfid;
            }),
            language_id: post.language.id,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <LoadingSpinner className={cx("spinner")} />;
            if (error) return `Error!: ${error}`;
            let aircrafts = this.sortByDisplayedFirst(data.posts);
            //Filter by category
            aircrafts = category ? aircrafts.filter(aircraft => aircraft.meta.category === category) : aircrafts;
            //Filter by manufacturer
            aircrafts = manufacturer
              ? aircrafts.filter(aircraft => aircraft.meta.manufacturer === manufacturer)
              : aircrafts;
            //Filter by title
            aircrafts = title
              ? aircrafts.filter(aircraft => _.toLower(aircraft.title).includes(title.toLowerCase()))
              : aircrafts;
            
            return (
              <AircraftModelList
                aircrafts={aircrafts}
                comparedAircrafts={this.state.comparedAircrafts}
                showMoreTextDefault="load more"
                showMoreTextId="client.jetComparator.showMoreButtonText"
                cardStyle="compare"
                changeOption={this.changeOption}
              />
            );
          }}
        </Query>
        {this.state.comparedAircrafts.length > 1 ? (
          <section>
            <AircraftContainer>
              <AircraftComparison
                langCode={this.props.post.language.locale}
                aircrafts={this.state.comparedAircrafts}
                removeAircraft={this.removeAircraft}
                categories={categories}
                manufacturers={manufacturers}
              />
            </AircraftContainer>
            <JetCabinComparator isFetching={false} comparedAircrafts={this.state.comparedAircrafts} />
            <JetDetailMap isFetching={false} comparedAircrafts={this.state.comparedAircrafts} />
          </section>
        ) : null}
      </Page>
    );
  }
}

// const mapStateToProps = state => ({
//   loading: state.data.loading,
//   categories: state.data.categories,
//   manufactureres: state.data.manufactureres,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getAircraftTaxonomies: () => dispatch(getAircraftTaxonomies()),
// });

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const JetComparator = ({ post, hreflangs }) => (
  <Query query={GET_SF_AIRCRAFTS_CATEGORIES_MANUFACTURERS}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return <PageJetComparator {...{ post, hreflangs, data }} />;
    }}
  </Query>
);

export default connect(mapStateToProps, mapDispatchToProps)(JetComparator);
