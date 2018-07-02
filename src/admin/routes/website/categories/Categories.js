import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTermTaxonomy, addTermTaxonomy, removeTermTaxonomy } from "admin/actions/termTaxonomy";
import moment from "moment/moment";
import _ from "lodash";
import {
  Alert,
  Menu,
  Button,
  Switch,
  ContextMenu,
  Tooltip,
  Overlay,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
  Toaster,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core";
import cx from "classnames";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Categories.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import TiTrash from "react-icons/lib/ti/trash";
import TiEye from "react-icons/lib/ti/eye-outline";
import TiPencil from "react-icons/lib/ti/pencil";
import MdAdd from "react-icons/lib/md/add-circle";
import LoadingSpinner from "admin/components/LoadingSpinner";

class Categories extends Component {
  static contextTypes = { client: PropTypes.object.isRequired };

  constructor(props) {
    super(props);
    this.state = {
      term: {
        taxonomy: "",
        name: "",
        parent_id: "",
        language_id: ""
      },
      termTaxonomy: [],
      isLoading: false
    };
  }

  addCategory = async () => {
    this.setState({ isLoading: true });
    const data = await this.props.addTermTaxonomy(this.state.term);
    let listTermTaxonomy = this.state.termTaxonomy;
    if (!this.state.term.parent_id) {
      listTermTaxonomy.push(data.response.result.termTaxonomy);
      this.setState({ termTaxonomy: listTermTaxonomy, isLoading: false });
    } else {
      let newList = [];
      listTermTaxonomy.forEach(taxonomy => {
        if (taxonomy.term.id == this.state.term.parent_id) {
          let newSub = [];
          taxonomy.sub.forEach(aItem => {
            newSub.push(aItem);
          });
          newSub.push(data.response.result.termTaxonomy);
          taxonomy.sub = newSub;
          newList.push(taxonomy);
        } else {
          newList.push(taxonomy);
        }
      });
      this.setState({ termTaxonomy: newList, isLoading: false });
    }
  };
  handleChange = e => {
    this.setState({
      term: {
        ...this.state.term,
        [e.target.name]: e.target.value
      }
    });
  };
  onSelectSection = async e => {
    this.setState({
      term: {
        ...this.state.term,
        [e.target.name]: e.target.value
      },
      isLoading: true
    });
    let listTermTaxonomy = [];
    const data = await this.props.fetchTermTaxonomy({ taxonomy: e.target.value });
    data.response.taxonomies.forEach(async taxonomy => {
      const dataChild = await this.props.fetchTermTaxonomy({ parent_id: taxonomy.term.id });
      taxonomy = { ...taxonomy, sub: dataChild.response.taxonomies };
      listTermTaxonomy.push(taxonomy);
    });
    this.setState({
      termTaxonomy: listTermTaxonomy,
      isLoading: false
    });
  };
  
  removeCategory= (e,id) => {
	e.stopPropagation();
	e.preventDefault();
	this.props.removeTermTaxonomy(id);
  };

  render() {
    const { currentRoute, defaultLanguage, languages } = this.props;

    function actionFormatter(cell, row) {
      return (
        <div className={s["action-btn-group"]}>
          <span className={s["icn"]}>
            <TiPencil size="24" />
          </span>
          <span className={s["icn"]}>
            <TiEye size="24" />
          </span>
          <span className={cx(s["icn"], s["trash"])}>
            <TiTrash size="24" />
          </span>
        </div>
      );
    }

    const selectRow = {
      mode: "checkbox",
      clickToSelect: false
    };

    const columns = [
      {
        dataField: "title",
        text: "Title"
        // sort: true,
      },
      {
        dataField: "summary",
        text: "Summary"
        // sort: true,
      },
      {
        dataField: "created_at",
        text: "Date created"
        // sort: true,
      },
      {
        dataField: "updated_at",
        text: "Date modified"
        // sort: true,
      },
      {
        dataField: "state",
        text: "Status"
        // sort: true,
      },
      {
        dataField: "",
        text: "",
        formatter: actionFormatter,
        headerClasses: "admin-action-button"
        // sort: true,
      }
    ];

    const defaultSorted = [
      {
        dataField: "name",
        order: "desc"
      }
    ];

    return (
      <div className={cx("container", s["admin-table-list"])}>
        {/* title */}
        <div className="row">
          <div className="col-10">
            <div className={cx("sect-title")}>Category Management</div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="pt-form-group">
              <label className="pt-label">
                <span>Choose Category Section</span>
                <div className="pt-select pt-inline">
                  <select
                    className={cx("pt-fill")}
                    value={this.state.term.taxonomy}
                    name="taxonomy"
                    onChange={this.onSelectSection}
                  >
                    <option key="empty" value="" />
                    <option key="article_category" value="article_category">
                      Article Category
                    </option>
                    <option key="event_category" value="event_category">
                      Event Category
                    </option>
                    <option key="aircraft_category" value="aircraft_category">
                      Aircraft Category
                    </option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </div>
        {this.state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <div className="row">
              <div className="col-2">
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="name">
                    <span>Parent</span>
                    <div className="pt-select pt-inline">
                      <select className={cx("pt-fill")} name="parent_id" onChange={this.handleChange}>
                        <option key="empty" value="" />
                        {this.state.termTaxonomy.map(term => {
                          return (
                            <option key={term.term.id} value={term.term.id}>
                              {term.term.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </label>
                </div>
              </div>
              <div className="col-2">
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="name">
                    <span>Name</span>
                    <div className="pt-input-group">
                      <input
                        maxLength={80}
                        type="text"
                        name="name"
                        className="pt-input pt-large pt-fill pt-bold"
                        id="name"
                        onChange={this.handleChange}
                        placeholder="Name"
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="col-2">
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="language">
                    <span>Language</span>
                    <div className="pt-select pt-inline">
                      <select className={cx("pt-fill")} name="language_id" onChange={this.handleChange}>
                        <option key="empty" value="" />
                        {this.props.languages.map(language => {
                          return (
                            <option key={language.id} value={language.id}>
                              {language.language}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </label>
                </div>
              </div>
              <div className="col-2">
                <div className="pt-form-group">
                  <Button className={cx("pt-button pt-minimal")} onClick={this.addCategory}>
                    Add Category
                  </Button>
                </div>
              </div>
            </div>
            <div className={s.categories}>
              <table className="pt-table pt-striped lj-table">
                <thead>
                  <tr>
                    <th className="id-col">Name</th>
                    <th>Slug</th>
                    <th>Sub Category</th>
					<th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.termTaxonomy.map(termTaxonomy =>{
                    return(<tr>
                      <td>{termTaxonomy.term.name}</td>
                      <td>{termTaxonomy.term.slug}</td>
                      <td>{termTaxonomy.sub ? termTaxonomy.sub.map(aSub => {
                        return(<tr>
                          <td>{aSub.term.name}</td>
                          <td>{aSub.term.slug}</td>
                        </tr>);
                      }) : null}</td>
					  <td>
					    <Button className={cx("pt-button pt-minimal")} onClick={e => this.removeCategory(e,termTaxonomy.term.id)}>
                          Remove Category
                        </Button>
					  </td>
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const availableLocales = state.runtime.availableLocales;
  const languages = Object.keys(availableLocales).map(function(_) { return availableLocales[_]; })
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];
  return {
    defaultLanguage,
    languages,
  };
};

export default connect(mapStateToProps, { fetchTermTaxonomy, addTermTaxonomy, removeTermTaxonomy })(withStyles(s)(Categories));
