import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../../../../../../styles/row.css";
import cx from "classnames";
import { connect } from "react-redux";
import Checkbox from "../../../../../components/checkbox";


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


class EmptyLegRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.activate = this.activate.bind(this);
    this.state = {
      active: false,
    };
  }

  handleDoubleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  activate(ev) {
    this.setState({
      active: !this.state.active,
    });
    this.props.emptyLegRemoval(this.props.emptyLeg.id);
  }

  render() {
    return (
      <tr onDoubleClick={this.handleDoubleClick} className={this.state.active ? s.active : ""}>
        <td><Checkbox for={this.props.emptyLeg.id} change={this.activate} /></td>
        <td>
          <div className={s.container}>
            <div ><b>{this.props.emptyLeg.date}</b>
            </div>
            <div className={s.description}>
              <div>
                <img src="https://www.lunajets.com/inc.img/flags/24/IT.png" alt="Italy" title="Italy" />
              </div>
              <div>{this.props.emptyLeg.from} <span>LIN</span>
              </div>
              <div>
                <img src="https://www.lunajets.com/inc.img/empty-legs/icon-empty-legs-arrow-right.png" />
              </div>
              <div><img src="https://www.lunajets.com/inc.img/flags/24/ES.png" alt="Spain" title="Spain" />
              </div>
              <div>{this.props.emptyLeg.to} <span>MAD</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div>
            <div className={s.description}>
              <span><img src="https://www.lunajets.com/inc.img/empty-legs/icon-empty-legs-plane.png" alt="Emptyleg Icon Plane" title="Emptyleg Icon Plane" /></span>
              <span>Embraer<br />Legacy 650</span>
            </div>
            <div className={s.description}>
              <span>
                <img src="https://www.lunajets.com/inc.img/empty-legs/icon-empty-legs-capacity.png" alt="Emptyleg Capacity" title="Emptyleg Capacity" />
              </span>
              <span>13
              </span>
            </div>
          </div>
        </td>
        <td><span className={s.price}>{this.props.emptyLeg.price}</span></td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { })(withStyles(s)(EmptyLegRow));
