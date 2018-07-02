import React, { Component } from 'react';
import Page from '../page';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import Slider from "themes/lunajets/components/Widgets/Slider";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import Heading from "themes/lunajets/components/Layout/Heading";
import DestinationList from "themes/lunajets/components/Content/Destination/DestinationList";
import Header from 'themes/lunajets/components/Layout/Header';
import background from "../home/gfx/map.png";
export class DestinationListPage extends Component {
  render() {
    const { post, hreflangs } = this.props;
    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src ? post.media.src : background} alt={post.title.toUpperCase()}/>
        <div className="container pt-5">
          <SectionTitle textId="title.destinationList" defaultMessage="destinations list"/>
          <Heading text={post.title}/>
        </div>
        <DestinationList />
      </Page>
    );
  }
}

export default DestinationListPage;
