import React, { Component } from "react";
import { connect } from "react-redux";
import { Query, graphql } from 'react-apollo';
import gql from "graphql-tag";
import cx from "classnames";
import LoadingSpinner from "../../components/Widgets/LoadingSpinner";
import Header from "../../components/Layout/Header";
import SimpleSubHeader from "../../components/Content/SimpleSubHeader";
import TestimonialsList from "../../components/Content/Lists/TestimonialsList";
import Button from "../../components/Primitives/Button";
import background from "../home/gfx/map.png";
import Page from "../page";

// import {
//   getReviews,
// } from "../../actions/data";

import GET_POSTS from '../../queries/getReviewPosts.gql';

export class Testimonials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLimit: 9,
      defaultLimit: 9,
    }

    this.viewMore = this.viewMore.bind(this);
  }
  // componentWillMount() {
  //   const query = {
  //     type: 'review',
  //     pagination: {
  //       offset: 0,
  //       limit: this.state.defaultLimit
  //     }
  //   }
  //   this.props.getReviews(query);
  // }

  viewMore() {
    this.setState({
      currentLimit: this.state.currentLimit + this.state.defaultLimit
    });
  }

  render() {
    const { post, hreflangs } = this.props;
    
    const heading = {
      subtitle: {
        defaultMessage: "Reviews",
        id: "client.testimonials.banner.subtitle",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: "client.testimonials.param.title1",
      },
      content: {
        defaultMessage: "",
        id: "client.testimonials.param.content",
      }
    };
    
    const query = {
      language_id: this.props.language_id,
      pagination: {
        offset: 0,
        limit: this.state.currentLimit
      }
    }
      
    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media ? post.media.src : background} alt={post.title.toUpperCase()} />
        <SimpleSubHeader heading={heading}>
          <Button className="btn btn-secondary" defaultMessage="SHARE YOUR EXPERIENCE" textId="client.testimonials.button.shareYourExperience" />
        </SimpleSubHeader>

        <Query query={GET_POSTS} variables={query} fetchPolicy="cache-and-network">
          {({ error, data, fetchMore }) => {
            if (error) return `Error!: ${error}`;
            return <TestimonialsList
                      reviews={data.posts}
                      viewMore={() =>
                        fetchMore({
                          variables: {
                            pagination: {
                              offset: data.posts.length,
                              limit: this.state.currentLimit
                            }
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              posts: [...prev.posts, ...fetchMoreResult.posts]
                            });
                          }
                        })
                      }
                    />;
          }}
        </Query>        
      </Page>
    );
  }
}

// const mapStateToProps = state => ({
//   loading: state.data.loading,
//   reviews: state.data.reviews,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getReviews: (query) => dispatch(getReviews(query)),
// });

const mapStateToProps = (state) => {

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
    language_id : language_id,
	  locale : currentLocale,
  };
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);
