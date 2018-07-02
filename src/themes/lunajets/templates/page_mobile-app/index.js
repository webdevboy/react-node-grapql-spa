import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import SimpleSubHeader from "themes/lunajets/components/Content/SimpleSubHeader";
import CareerList from 'themes/lunajets/components/Content/Career/CareerList';
import CareerOpeningList from 'themes/lunajets/components/Content/Career/CareerOpeningList';
import MobileHeaderButton from 'themes/lunajets/components/Content/MobileApp/MobileHeaderButton';
import MobileList from 'themes/lunajets/components/Content/MobileApp/MobileList';
import MobileVideo from 'themes/lunajets/components/Content/MobileApp/MobileVideo';
import MobileScreens from 'themes/lunajets/components/Content/MobileApp/MobileScreens';
import Text from "themes/lunajets/components/Primitives/Text";
import Page from '../page';
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql';
import { Query, graphql } from 'react-apollo';

export class Career extends Component {
  render() {
    const { hreflangs } = this.props;
    const { post } = this.props;
    let jsonBody;
    const body = post.body && post.body.main || '';
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: 'MOBILE APP',
        id: "client.mobile.subtitle",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: "client.corporate.param.title1",
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const mobileList = {
      id: "client.mobile.list",
      src: "",
      lists: [
        {
          title: "user profile1",
          badge: "",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "sign contract digitally",
          badge: "",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "live chat",
          badge: "",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "empty legs",
          badge: "",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "flight request simplified",
          badge: "",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "aircraft",
          badge: "",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    };

    const headerButton = {
      id: "client.mobile.appstore.button",
      text: "Available for iOS and Android",
    };

    const mobileVideo = {
      id: "client.mobile.video",
      text: "Booking Experience with lunajets mobile app",
      textColor: "lt-blue",
      src: ""
    };

    const mobileScreens = {
      id: "client.mobile.screens",
      title: "screenshots",
      titleColor: "lt-blue",
      slidesToShow: 4,
      slidesToScroll: 4,
      srcs: ""
    };

    const ids = (post.meta.service_list || []).map(value => value.post_uuid);
    // console.log('====> Lang', post);

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <SimpleSubHeader heading={heading}>
          <MobileHeaderButton career={headerButton}/>
        </SimpleSubHeader>
        <div className="container px-0">
          <MobileList mobile={mobileList} />
        </div>
        <MobileVideo mobile={mobileVideo} />
        <MobileScreens mobile={mobileScreens} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Career);
