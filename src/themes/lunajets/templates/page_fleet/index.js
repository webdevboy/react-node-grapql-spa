import React, { Component } from "react";
import { connect } from "react-redux";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import cx from "classnames";
import _ from 'lodash';
import Header from 'themes/lunajets/components/Layout/Header';
import LoadingSpinner from "themes/lunajets/components/Widgets/LoadingSpinner";
import background from "../home/gfx/map.png";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import AircraftSearchBox from "themes/lunajets/components/Content/Fleet/AircraftSearchBox";
import AircraftModelList from "themes/lunajets/components/Content/Fleet/AircraftModelList";
import AircraftContainer from "themes/lunajets/components/Content/Fleet/AircraftContainer";
import AircraftCompareJet from "themes/lunajets/components/Content/Fleet/AircraftCompareJet";
import AircraftCategoryList from "themes/lunajets/components/Content/Fleet/AircraftCategoryList";
import AircraftManufactureList from "themes/lunajets/components/Content/Fleet/AircraftManufactureList";

import GET_AIRCRAFT_POSTS from "../../queries/getAircraftPostsCategoriesManufacturers.gql"
import GET_POSTS_BY_TEMPLATE from "../../queries/getPostsByTemplate.gql";
import GET_AIRCRAFT_TAXONOMIES from "../../queries/getAircraftTaxonomies.gql";
import GET_SF_AIRCRAFTS_CATEGORIES_MANUFACTURERS from "../../queries/getSFAircraftsCategoriesManufacturers.gql";
// fleet
// import {
//   getAircraftTaxonomies,
// } from "../../actions/data";

import Page from "../page";

export class PageFleet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      manufacturer: "",
      title: '',
    }

  }

  // componentWillMount() {
  //   this.props.getAircraftTaxonomies();
  // }

  onSearch = (category, manufacturer, title) => {
    this.setState({
      category: category  ? category.sfid : "",
      manufacturer: manufacturer ? manufacturer.sfid : "",
      title
    });
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

  render() {
    const { post, hreflangs, data: {categories, manufacturers} } = this.props;
    const { category, manufacturer, title } = this.state;
    
    let jsonBody;
    const body = post.body ? post.body.main : '';
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: "Fleet",
        id: "client.fleet.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const rCategories = categories ? categories.map(category => ({
        name: category.name,
        sfid: category.sfid,
        order: category.order,
      })) : [];

    const rManufacturers = manufacturers ? manufacturers.map(manufacture => ({
        name: manufacture.name,
        sfid: manufacture.sfid,
        order: manufacture.order,
      })) : [];

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src ? post.media.src : background} alt={post.title.toUpperCase()}/>
        <SectionDescription section={heading} />
        <AircraftSearchBox onSearch={this.onSearch} categories={rCategories} manufacturers={rManufacturers} />
        <Query query={GET_AIRCRAFT_POSTS} variables={{
            category_sfids: rCategories.map(category => category.sfid),
            manufacturer_sfids: rManufacturers.map(manufacturer => {manufacturer.sfid}),
            language_id: post.language.id
          }}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingSpinner className={cx("spinner")} />;
            if (error) return `Error!: ${error}`;
            let aircrafts = this.sortByDisplayedFirst(data.getAircraftPostsByCategoryManufacturer);
            //Filter by category
            aircrafts = category ? aircrafts.filter(aircraft => aircraft.meta.category === category) : aircrafts;
            //Filter by manufacturer
            aircrafts = manufacturer ? aircrafts.filter(aircraft => aircraft.meta.manufacturer === manufacturer) : aircrafts;
            //Filter by title
            aircrafts = title ? aircrafts.filter(aircraft => _.toLower(aircraft.title).includes(title.toLowerCase())) : aircrafts;
            
            return <AircraftModelList cardStyle="fleet" showMoreTextDefault="View jet fleet" showMoreTextId="client.fleet.showMoreButtonText"  aircrafts={aircrafts} initialNum={12} />
          }}
        </Query>
        <AircraftContainer >
          <AircraftCompareJet summary={post.body.sub ? post.body.sub : ''}/>
        </AircraftContainer>
        <Query query={GET_POSTS_BY_TEMPLATE} variables={{
            type: 'page',
            template: 'private-jet-charter-category',
            language_id: post.language.id
          }}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingSpinner className={cx("spinner")} />;
            if (error) return `Error!: ${error}`;
            
            let categories = _.orderBy(data.posts, ['meta.order'], ['asc']);
            
            categories = categories ? categories.map(category => ({
              image: category.meta && category.meta.teaser_image ? category.meta.teaser_image.src : null,
              name: category.meta.teaser_text,
              slug: category.slug,
              meta: category.meta,
            })) : [];

            return <AircraftCategoryList categories={categories} />
          }}
        </Query>     
        <Query query={GET_POSTS_BY_TEMPLATE} variables={{
            type: 'page',
            template: 'private-jet-charter-manufacturer',
            parentId: post.id,
            language_id: post.language.id
          }}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingSpinner className={cx("spinner")} />;
            if (error) return `Error!: ${error}`;
            
            let manufacturers = _.orderBy(data.posts, ['meta.order'], ['asc']);
            
            manufacturers = manufacturers ? manufacturers.map(manufacture => ({
              image: manufacture.meta && manufacture.meta.teaser_image ? manufacture.meta.teaser_image.src : null,
              name: manufacture.meta.teaser_text,
              slug: manufacture.slug,
              meta: manufacture.meta,
            })) : [];

            return <AircraftManufactureList manufacturers={manufacturers} />
          }}
        </Query>
      </Page>
    );
  }
}


// const mapStateToProps = state => ({
//   loading: state.data.loading,
//   categories: state.data.categories,
//   manufacturers: state.data.manufacturers,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getAircraftTaxonomies: () => dispatch(getAircraftTaxonomies()),
// });

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

const Fleet = ({ post, hreflangs }) =>
  (<Query query={GET_SF_AIRCRAFTS_CATEGORIES_MANUFACTURERS}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return <PageFleet {...{ post, hreflangs, data }} />;
    }}
   </Query>);

export default connect(mapStateToProps, mapDispatchToProps)(Fleet);
