import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import EventBanner from "themes/lunajets/components/Content/Detail/Event/EventBanner";
import EventDescription from "themes/lunajets/components/Content/Detail/Event/EventDescription";
import EventRecommended from "themes/lunajets/components/Content/Detail/Event/EventRecommended";
import EventHelicopter from "themes/lunajets/components/Content/Detail/Event/EventHelicopter";
import Page from "../page";

class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const event = this.props.post;
    const { hreflangs } = this.props;

    return (
      <Page post={event} hreflangs={hreflangs}>
        <EventBanner data={{ event }} />
        <EventDescription data={{ event }} />
        {(event && event.meta && event.meta.recommended_airports && event.meta.recommended_airports.length > 0) ? <EventRecommended data={{ event }} /> : null}
        {event && event.meta && event.meta.display_helicopter_transfer ? <EventHelicopter data={{ event }} /> : null}
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
