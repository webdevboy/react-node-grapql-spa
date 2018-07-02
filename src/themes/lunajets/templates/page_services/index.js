import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import ServiceList from 'themes/lunajets/components/Content/Service/ServiceList';
import CorporateList from 'themes/lunajets/components/Content/Corporate/CorporateList';
import Page from '../page';
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql';
import { Query, graphql } from 'react-apollo';

export class Services extends Component {
  render() {
    const { hreflangs } = this.props;
    const { post } = this.props;
    let jsonBody;
    const body = post.body ? post.body.main : '';
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: 'SERVICES',
        id: "client.service.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const serviceText = [
      {
        id: "client.servicesList.requestFlights",
        defaultTitle: "PRIVATE JET CHARTERS",
        defaultSubTitle: "On-demand private flights at the best price",
        defaultText: "With access to over 4,800 aircraft around the world, we can organise any private jet flight for you. From business flights to weekend getaways with your family, urgent last minute flights to long haul transatlantic flights, LunaJets will provide you with a world-class service before, during and after your flight",
        defaultButtonText: "REQUEST FLIGHTS"
      },
      {
        id: "client.servicesList.emptyLegs",
        defaultTitle: "EMPTY LEGS",
        defaultSubTitle: "Save up to 75% when you book an empty leg",
        defaultText: "Empty leg flights allow you to charter an aircraft returning home after dropping off passengers or flying o pick up passengers. Because the flight is already paid for, empty legs are heavily discounted - up 75% less than standard jet charger prices. Our list of empty legs is updated daily so you'll always benefit from the best deals.",
        defaultButtonText: "VIEW ALL EMPTY LEGS",
      }
    ]

    const ids = (post.meta.corporate_list || []).map(value => value.post_uuid);
 
    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <div className="container px-0">
          <SectionDescription section={heading} />
          <ServiceList corporate={serviceText} />
          <Query query={GET_POSTS} variables={{ ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            return <CorporateList 
                      locale={post.language.locale}
                      corporate={data.posts} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
