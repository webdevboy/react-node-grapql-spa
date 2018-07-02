import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../../../../../../styles/list.css";
import cx from "classnames";
import { connect } from "react-redux";
import Row from "./row";


const messages = defineMessages({
  general: {
    id: "settings.generalSettings.header",
    defaultMessage: "General",
    description: "settings.generalSettings.header",
  },
  siteTitle: {
    id: "settings.generalSettings.field.siteTitle",
    defaultMessage: "Site title",
    description: "settings.generalSettings.field.siteTitle",
  },
  siteDescription: {
    id: "settings.generalSettings.field.siteDescription",
    defaultMessage: "Description",
    description: "settings.generalSettings.field.siteDescription",
  },
  siteDefaultEmail: {
    id: "settings.generalSettings.field.siteDefaultEmail",
    defaultMessage: "Default email",
    description: "settings.generalSettings.field.siteDefaultEmail",
  },
  save: {
    id: "actions.save",
    defaultMessage: "Save",
    description: "actions.save",
  },
});


class EmptyLegsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        id: "9320192",
        date: "WED 5 JUN",
        from: "Linate",
        to: "Barajas",
        jet: "Embraer Legacy 650",
        seat: "13",
        price: "15710",
      },
      {
        id: "9320194",
        date: "WED 8 JUN",
        from: "Linate",
        to: "Barajas",
        jet: "Embraer Legacy 650",
        seat: "13",
        price: "18710",
      }],
    };
  }

  handleDoubleClick() {
    // history.push('/chat/1223');
  }

  render() {
    return (
      <div className={cx("container", s.container)}>
        <table className={cx("table", s.table)}>
          <thead>
            <tr>
              <th />
              <th>Description</th>
              <th>Jet Model</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(emptyLeg =>
              <Row key={emptyLeg.id} emptyLeg={emptyLeg} emptyLegRemoval={this.props.emptyLegRemoval} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redirections: state.admin.redirections,
});

export default connect(mapStateToProps, { })(withStyles(s)(EmptyLegsList));
