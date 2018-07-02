import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../page';
import Header from 'themes/lunajets/components/Layout/Header';
import background from '../home/gfx/corporate-detail-bg.png';
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";

export class PageJobDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hreflangs, post } = this.props;

    let jsonBody;
    const body = post.body ? post.body.main : {};
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const job = {
      subtitle: {
        defaultMessage: 'Job',
        id: `client.singleJob.subtitle`,
        color: 'lt-blue',
      },
      title: {
        defaultMessage: post.title.toUpperCase()
      },
      content: {
        defaultMessage: jsonBody,
      },
    };
    
    return (
      <div>
        <Page post={post} hreflangs={hreflangs}>
          <Header background={post.media && post.media.src} />
          <SectionDescription section={job} />
        </Page>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(PageJobDetails);
