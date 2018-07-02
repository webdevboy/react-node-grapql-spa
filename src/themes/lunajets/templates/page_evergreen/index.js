import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import EventsList from 'themes/lunajets/components/Content/Lists/EventsList';
import LatestNews from 'themes/lunajets/components/Content/Lists/LatestNews';
import EvergreenSlider from 'themes/lunajets/components/Content/Lists/EvergreenSlider';
import Slider from 'themes/lunajets/components/Widgets/Slider';
import Page from '../page';

export class Evergreen extends Component {
  render() {
    const {hreflangs, post} = this.props;
    const slides = [
      {
        image:
          "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.pbs.org%2Fposter_images%2Fcollections%2FGREAT_JOB_poster.png.resize.710x399.png&f=1",
        description: "slider 1 descritpion",
      },
      {
        image:
          "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.pbs.org%2Fposter_images%2Fcollections%2FGREAT_JOB_poster.png.resize.710x399.png&f=1",
        description: "slide 2 description",
      },
    ];
    return (
      <Page post={post} hreflangs={hreflangs}>
        <EvergreenSlider />
        <LatestNews />
        <EventsList />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Evergreen);
