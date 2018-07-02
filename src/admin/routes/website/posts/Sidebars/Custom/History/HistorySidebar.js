import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./History.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import Action from "admin/components/Action";
import TooltipLabel from "admin/components/TooltipLabel";
import Loading from "react-loading-animation";
import _ from 'lodash';
import moment from 'moment';
import { Input } from "admin/components/Editor/Plugins/TablePlugin/FormComponents";

import aircraft from "./gfx/aircraft.svg";
import businessman from "./gfx/businessman.svg";
import office from "./gfx/office.svg";
import premium from "./gfx/premium-badge.svg";
import officeCopy from "./gfx/office copy.svg";

class HistorySidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPosts: [],
      posts: [],
      images: [aircraft, businessman, office, premium, officeCopy],
      months: ['No Month'].concat(moment.months()),
      currentYear: new Date().getFullYear(),
      currentDescriptions: [],
      years: this.getYears(),
      postFetched: false,
      history: []
    }
    this.currentHistoryIndex = 0;
  }  

  componentDidMount() {
    let history = this.props.post.meta && this.props.post.meta.history ? _.cloneDeep([...this.props.post.meta.history]) : [];
    this.setState({ history });
  }
  
  getYears() {
    const currentYear = new Date().getFullYear();
    return _.range(currentYear, currentYear - 30);
  }

  onChangeYear(e) {
    this.setState({currentYear: e});
  } 
  
  handleChange(e, p, fieldName, image) {
    if(fieldName=='image'){
      p[fieldName] = image;
    }
    else{
      p[fieldName] = e.target.value;
    }    
    this.setState({history: this.state.history});

    const history = this.state.history.filter(item => item.descriptions.length > 0)

    this.props.onMetaChange({
      ...this.props.post.meta,
      history
    });
  }

  getDescription = (des, monthIndex) => {    
    if(des){      
      return (
        <Fragment>
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="month">
              <span>Month</span>
              <div className={cx("float-right mt-0", s["btn-remove"])}>
                <Action
                  key="month-action-remove"
                  icon="pt-icon-remove"
                  intent="pt-intent-danger"
                  action={e => this.removeMonth(e, monthIndex)}                      
                  tooltip="Remove a Month"
                />
              </div>
              <div className="pt-select pt-inline">
                <select
                  className={cx("pt-fill")}
                  value={des.month}
                  name="month"
                  onChange={(e) => this.handleChange(e, des, 'month')}
                >
                  {this.state.months.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </label>            
          </div>
          <div className="pt-form-group">          
            <label className="pt-label" htmlFor="description">
              <TooltipLabel label="Description"/>
              <input
                id="description"
                type="text"
                name="description"
                intent="pt-intent-primary"
                className="pt-input pt-fill"
                value={des.description}
                onChange={(e) => this.handleChange(e, des, 'description')}
                placeholder="Description"
              />
            </label>
            {
              des.percs.map((p, index)=>
                <div>
                  <div className={cx("float-right", s["btn-remove"])}>
                    <Action
                      key="item-action-remove"
                      icon="pt-icon-remove"
                      intent="pt-intent-danger"
                      action={e => this.removeField(e, des, index)}                      
                      tooltip="Remove a Field"
                    />
                  </div>                  
                  <div className={cx("d-flex")}>
                    <div className={cx("d-flex align-items-center")}>
                      <div className={cx("dropdown")}>
                        <button type="button" className={cx("btn dropdown-toggle", s["dropdown-toggle-history"])} data-toggle="dropdown">
                          {p.image && <img className={cx(s["drop-image"])} src={p.image}/>}
                          {!p.image && <span>Select Image</span>}
                        </button>
                        <div className={cx("dropdown-menu", s["dropdown-menu-history"])}>
                          {this.state.images.map(image => (
                            <a className={cx("dropdown-item", s["dropdown-menu-history-item"])} onClick={(e) => this.handleChange(e, p, 'image', image)}>                            
                              <img className={cx(s["drop-image"])} src={image} />
                            </a>
                          ))}                      
                        </div>
                      </div>
                    </div>                  
                    <div className={cx("w-100 pl-3")}>                  
                      <label className="pt-label" htmlFor="title">
                        <input
                          id="title"
                          type="text"
                          name="title"
                          intent="pt-intent-primary"
                          className="pt-input pt-fill"              
                          value={p.text}
                          onChange={(e) => this.handleChange(e, p, 'text')}
                          placeholder="Field"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                )
            }
            <div className={cx("mt-2")}>
              <Action
                key="action-add-field"
                icon="pt-icon-add"
                label="Add a Field"
                intent="pt-intent-primary"              
                action={e => this.addField(e,des)}
              />
            </div>            
          </div>
        </Fragment>
      )
    }    
  }

  addYear = (e) => {
    const des = {month: 'No Month', description: '', percs: []};    
    const currentHistory = this.getCurrentHistory();

    currentHistory.descriptions.push(des);
    this.setState({history: this.state.history});
  }

  addMonth = (e) => {
    const des = {month: 'No Month', description: '', percs: []};    
    const currentHistory = this.getCurrentHistory();

    currentHistory.descriptions.push(des);
    this.setState({history: this.state.history});
  }

  removeMonth = (e, index) => {
    let currentHistory = this.getCurrentHistory();    
    currentHistory.descriptions.splice(index, 1);    
    this.setState({history: this.state.history});
  }

  addField = (e, des) => {
    des.percs.push({
      "icon-class": 'fa-building-o', // font awesome icon class, can be change to whatever we might use,
      text: '',
    });
    this.setState({history: this.state.history});
  }

  removeField = (e, des, index) => {
    des.percs.splice(index,1);    
    this.setState({history: this.state.history});
  }

  handleChangeYear(e) {
    this.setState({ currentYear: e.target.value });
  }

  getCurrentHistory() {
    let { history, currentYear } = this.state;
    let currentHistory = _.find(history, {year: currentYear});

    if (!currentHistory) {
      currentHistory = {
        year: currentYear,
        descriptions: []
      };      
      this.setState({ history: history.concat([currentHistory]) });
    }
    return currentHistory;
  }

  render() {
    let { handleChange, post, categories } = this.props;
    let { currentYear } = this.state;    
    let currentHistory = this.getCurrentHistory();

    const Loading = (
      <MenuItem
        className={s.menuloader}
        text="Fetching Models ..."
        label={<Button type="button" className={cx("pt-button pt-fill pt-minimal")} loading />}
      />
    );

    const NoResults = <MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />;

    const getTagProps = (_value, index) => ({
      intent: Intent.NONE,
      minimal: false
    });

    const clearButton =
      this.state.selectedPosts.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleClear} />
      ) : null;

    return (
      <div className="pt-form-group">
        <TooltipLabel label="Custom Fields"/>
        <br/>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="year">
            <span>Year</span>
            <div className="pt-select pt-inline">
              <select
                className={cx("pt-fill")}
                value={currentYear}
                name="year"
                onChange={(e) => this.handleChangeYear(e)}
              >
                {this.state.years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <div className={cx("pl-4 pt-3")}>
            {
              currentHistory.descriptions.map((description, index) => this.getDescription(description, index))
            }            
          </div>
          <div className={cx("mt-2")}>
            <Action
              key="action-add-field"
              icon="pt-icon-add"
              label="Add Month"
              action={this.addMonth}
            />
          </div>          
        </div>        
      </div>
    );
  }
}

HistorySidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({

});

export default connect(mapStateToProps)(
  withStyles(s)(HistorySidebar)
);
