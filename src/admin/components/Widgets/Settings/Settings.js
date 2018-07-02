import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateOptions } from "../../../actions/settings";
import _ from "lodash";
import Widget from "../../Widget";
import OptionField from "./OptionField";

class Settings extends React.Component {
  state = {
    options: {},
  };

  updateOption = ({ option, value, hidden = false }) => {
    console.log("AQUI");
    this.setState({
      options: {
        ...this.state.options,
        [option]: {
          value,
          hidden,
        },
      },
    });
  };

  submitChanges = async () => {
    await this.props.updateOptions(this.state.options);
    return this.reset();
  };

  reset = () => {
    this.setState({
      options: {},
    });
  };

  render() {
    const { title, opts, settings } = this.props;
    const hasChangedOptions = Object.keys(this.state.options).length;
    return (
      <Widget title={title}>
        {opts.map(option => (
          <OptionField
            key={`opt-field-${option.key}`}
            option={option}
            onUpdate={this.updateOption}
            value={settings[option.key] ? settings[option.key].value : option.default}
          />
        ))}
        <button
          className={cx("pt-button pt-icon-tick-circle", hasChangedOptions ? "pt-intent-success" : "")}
          type="button"
          onClick={this.submitChanges}
        >
          Save
        </button>
      </Widget>
    );
  }
}

const mapStateToProps = (state, { options }) => {
  const keys = Object.keys(options).map(key => key);
  return {
    settings: state.settings.byId,
    opts: _.orderBy(
      keys.map(key => {
        if (options[key].state) {
          const objectState = _.get(state, options[key].state, false);

          if (objectState) {
            const values = Object.keys(objectState).map(okey => {
              const fields = Object.keys(options[key].objectKeys).reduce((accumulator, value) => {
                accumulator[value] = objectState[okey][options[key].objectKeys[value]];
                return accumulator;
              }, {});

              return fields;
            });

            return {
              ...options[key],
              values: values,
              key,
            };
          }
        }

        return {
          ...options[key],
          key,
        };
      }),
      "order",
    ),
  };
};

export default connect(mapStateToProps, { updateOptions })(Settings);
