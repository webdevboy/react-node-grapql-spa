import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../../../../../styles/inspector.css";
import cx from "classnames";
import { createRedirection } from "../../../../../redux/actions/urlManager";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "../../../../components/_select";

const messages = defineMessages({
  currentTalks: {
    id: "currentTalks.container.header",
    defaultMessage: "Current Talks",
    description: "currentTalks.container.header",
  },
});

class UserInspector extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.change = this.change.bind(this);
    this.logChange = this.logChange.bind(this);
    this.state = {
      urlto: "",
      urlfrom: "",
      options: [
        {
          id: "0928-2918-2093",
          value: "1234",
          label: "Madrid",
          flag: "https://www.lunajets.com/inc.img/flags/24/ES.png",
        },
        {
          id: "0928-2918-2453",
          value: "2442",
          label: "Lisbon",
          flag: "https://www.lunajets.com/inc.img/flags/24/IT.png",
        },
        {
          id: "0928-2418-2453",
          value: "2442",
          label: "Paris",
          flag: "https://www.lunajets.com/inc.img/flags/24/ES.png",
        },
        {
          id: "0923-2918-2453",
          value: "2442",
          label: "Stockolm",
          flag: "https://www.lunajets.com/inc.img/flags/24/IT.png",
        },
        {
          id: "0228-2918-2453",
          value: "2442",
          label: "Bern",
          flag: "https://www.lunajets.com/inc.img/flags/24/IT.png",
        },
        {
          id: "0948-2918-2453",
          value: "2442",
          label: "Geneva",
          flag: "https://www.lunajets.com/inc.img/flags/24/IT.png",
        },
        {
          id: "0928-2618-2453",
          value: "2442",
          label: "Moscow",
          flag: "https://www.lunajets.com/inc.img/flags/24/IT.png",
        },
      ],
      options_jet: [
        {
          id: "0928-2918-2093",
          value: "1234",
          label: "GolfStrean",
          flag: "https://www.lunajets.com/inc.img/flags/24/ES.png",
        },
      ],
    };
  }

  handleClickSave() {
    this.props.createRedirection({ link: this.state.urlfrom, redirect: this.state.urlfrom });
  }

  handleClickClose() {
    this.props.toggleInspectorState();
  }

  change(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  logChange(ev) {
    // console.log("Selected: " + JSON.stringify(ev));
  }

  render() {
    return (
      <div>
        <div className={s["container-header"]}>
          <h3>Add new empty leg</h3>
        </div>
        <div className={s["container-content"]}>
          <div className={s.info}>
            <div>
              <label>Airport from</label>
              <Select name="airportfrom" placeholder="Airport name" options={this.state.options} />
              {/* <input name='urlfrom' value={this.state.urlfrom} className={s['fieldInput']} type='text' placeholder='Enter url from' onChange={this.change}/> */}
            </div>
            <div>
              <label>Airport to</label>
              <Select name="airportfrom" placeholder="Airport name" options={this.state.options} />
              {/* <input name='urlto' value={this.state.urlto} className={s['fieldInput']} type='text' placeholder='Enter url to' onChange={this.change}/> */}
            </div>
            <div>
              <label>Jet Model</label>
              <Select name="airportfrom" placeholder="Jet model" options={this.state.options_jet} />
              {/* <input name='urlto' value={this.state.urlto} className={s['fieldInput']} type='text' placeholder='Enter url to' onChange={this.change}/> */}
            </div>
            <div>
              <label>Date</label>
              <DatePicker className={s.fieldInput} placeholderText="Click to select a date" />
            </div>
            <div>
              <label>Price</label>
              <input
                name="urlto"
                value={this.state.urlto}
                className={s.fieldInput}
                type="text"
                placeholder="Enter price"
                onChange={this.change}
              />
            </div>
          </div>
        </div>
        <div className={s["container-action"]}>
          {this.props.fixed ? (
            false
          ) : (
            <div>
              <button className={s.actionsBtns} onClick={this.handleClickSave}>
                Add empty leg
              </button>
              <button className={s.actionsBtns} onClick={this.handleClickClose}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { createRedirection })(withStyles(s)(UserInspector));
