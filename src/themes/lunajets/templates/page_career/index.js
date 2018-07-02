import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import SimpleSubHeader from "themes/lunajets/components/Content/SimpleSubHeader";
import CareerList from 'themes/lunajets/components/Content/Career/CareerList';
import CareerOpeningList from 'themes/lunajets/components/Content/Career/CareerOpeningList';
import CareerHeaderButton from 'themes/lunajets/components/Content/Career/CareerHeaderButton';
import Text from "themes/lunajets/components/Primitives/Text";
import Page from '../page';
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql';
import { Query, graphql } from 'react-apollo';

export class Career extends Component {
  render() {
    const { hreflangs } = this.props;
    const { post } = this.props;
    let jsonBody;
    const body = post.body ? post.body.main : {};
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }  

    const heading = {
      subtitle: {
        defaultMessage: 'JOB OPPORTUNITIES',
        id: "client.career.subtitle.",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: "client.corporate.param.title1",
      },
      content: {
        defaultMessage: jsonBody,
        id: "client.career.param.content",
      },
    };

    const serviceText = [
      {
        id: "career-post-1",
        title: "team",
        text: "We are combining innovative technology and highest personal service standards. We are a dynamic and young eam that is disrupting the private aviaion industry with an innovative booking process. Join us as we continue to grow, 30-40% every year and expand our value proposition into different markets.",
      },
      {
        id: "career-post-2",
        title: "services",
        text: [
          "Service is the key driver of the LunaJets DNA.",
          "Our team is multilingual, multicultural and from the service industry.",
          "The client's entire satisfaction in this demanding WIP industry is our team's everyday achievement."
        ],
      },
      {
        id: "career-post-3",
        title: "benefits",
        text: [
          "Rigorous training(hard & soft skills)",
          "dynamic team mentorthip",
          "Regular performance evaluations",
          "Individual incentives and team rewards",
          "Competitive salary",
          "Unlimited vacation days"
        ],
      }
    ];

    const openingList = [
      {
        title: "Sales Excutive/ Private Aviation Advisor",
        meta: {
          country: "Geneva, CH",
          duration: "Full-Time"
        }
      },
      {
        title: "Sales Excutive/ Private Aviation Advisor",
        meta : {
          country: "Geneva, CH",
          duration: "Full-Time"
        }
      },
      {
        title: "Sales Excutive/ Private Aviation Advisor",
        meta: {
          country: "Geneva, CH",
          duration: "Full-Time"
        }
      }
    ];

    const headerButton = {
      id: "client.career.contactus.button",
      class: "btn lt-red-bg",
      text: "Connect with us on",
      iconText: "in"
    };

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <SimpleSubHeader heading={heading}>
          <CareerHeaderButton career={headerButton}/>
        </SimpleSubHeader>
        <div className="px-0">
          <CareerList corporate={serviceText} />
          <Query query={GET_POSTS} variables={{ type: "job" }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            let items = data.posts.filter(p=>p.language.id == post.language.id);
            return <CareerOpeningList corporate={items} />
          }}
          </Query>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Career);
