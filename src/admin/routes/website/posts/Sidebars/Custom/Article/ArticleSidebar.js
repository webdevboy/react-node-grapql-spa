import React, { Component, Fragment } from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { connect } from "react-redux";
import { Toaster, Position, Intent, Switch, MenuItem, Button } from "@blueprintjs/core";
import s from "./Article.css";

import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import { fetchPosts } from "admin/actions/posts";
import { Query } from "react-apollo";
import LoadingSpinner from "admin/components/LoadingSpinner";
import QUERY_GET_TERM_TAXONOMY from "./fetchData.graphql";
import { addTermTaxonomy } from "admin/actions/termTaxonomy";

class ArticleSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddTag: false,
	  isCatPrimarySelected: false,
	  idCatPrimary: "",
      selectedPosts: [],
      selectedCategories: [],
      selectedTags: [],
      tag: {
        taxonomy: "post_tag",
        name: "",
        language_id: this.props.defaultLanguage.id,
        parent_id: "",
      },
    };
  }

  componentDidMount() {
    const {
      posts,
      post: {
        meta: { also_interesting },
      },
    } = this.props;
    if (this.filterOriginalPosts(posts, also_interesting).length === 0) {
      this.props.fetchPosts({
        type: 'article'
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      posts,
      post: {
        meta: { also_interesting },
        taxonomies,
      },
    } = nextProps;
    const selectedCat = taxonomies.filter(tax => tax.taxonomy === "article_category");
	const parent = selectedCat.find(category => {
      return !category.parent_id;
    });
    if (nextProps.posts && nextProps.posts.length) {
      console.log("Testing: ", this.filterOriginalPosts(posts, also_interesting));
      this.setState({
        posts: nextProps.posts,
        selectedPosts: this.filterOriginalPosts(posts, also_interesting),
        selectedCategories: taxonomies.filter(tax => tax.taxonomy === "article_category"),
        selectedTags: taxonomies.filter(tax => tax.taxonomy === "post_tag"),
		isCatPrimarySelected: true && parent,
	    idCatPrimary: parent ? parent.term.id : "",
      });
    } else {
      this.setState({
        selectedCategories: taxonomies.filter(tax => tax.taxonomy === "article_category"),
        selectedTags: taxonomies.filter(tax => tax.taxonomy === "post_tag"),
      });
    }
  }

  renderPostItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.title} onClick={handleClick} />
  );

  renderPostTag = item => item.slug;

  addPost = item => {
    let selectedPosts = this.state.selectedPosts;
    if (this.getSelectedPostIndex(item) !== -1) {
      selectedPosts = selectedPosts.filter((post, i) => i !== this.getSelectedPostIndex(item));
    } else {
      selectedPosts = [...selectedPosts, item];
    }
    this.setState({ selectedPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      also_interesting: selectedPosts.map(post => ({ post_uuid: post.id })),
    });
  };

  filterPost = (query, item, index) => {
    const entry = _.toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  handleClear = () => {
    this.setState({ selectedPosts: [] });
    this.props.onMetaChange({
      ...this.props.post.meta,
      also_interesting: [],
    });
  };

  handleTagRemove = (_tag, index) => {
    let selectedPosts = this.state.selectedPosts;
    selectedPosts = this.state.selectedPosts.filter((post, i) => i !== index);
    this.setState({ selectedPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      also_interesting: selectedPosts,
    });
  };

  getSelectedPostIndex(post) {
    return this.state.selectedPosts.indexOf(post);
  }

  toggleFeatured = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured: !this.props.post.meta.featured,
    });
  };

  toggleFeaturedEvergreen = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured_evergreen: !this.props.post.meta.featured_evergreen,
    });
  };

  filterOriginalPosts = (posts, also_interesting) => {
    return posts.filter(v => (also_interesting || []).map(_v => _v.post_uuid).indexOf(v.id) !== -1);
  };

  renderCategoryItem = ({ handleClick, item, isActive }) => {
	const {isCatPrimarySelected, idCatPrimary} = this.state;
	let isDisable = false;
	if(isCatPrimarySelected){
	  if (!item.parent_id){
	    isDisable = item.term.id !== idCatPrimary;
	  }
	  else{
		isDisable = item.parent_id !== idCatPrimary;
	  }
	}
	return (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.id}
	  disabled={isDisable}
      text={item.parent_id ? "---- ".concat(item.term.name) : item.term.name}
      onClick={handleClick}
    />
  )};

  renderCategoryTag = item => item.term.name;

  renderTagItem = ({ handleClick, item, isActive }) => (
      <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.term.name} onClick={handleClick} />
  );

  renderTagTag = item => item.term.name;

  //getSelectedCategoryIndex(cat) {
  //  return this.state.selectedCategories.indexOf(cat);
  //}

  addCategory = item => {
    let selectedCategories = this.state.selectedCategories;
    let isCatPrimarySelected = this.state.isCatPrimarySelected;
	  let idCatPrimary = this.state.idCatPrimary;
    if (
      selectedCategories.find(cat => {
        return cat.id === item.id;
      })
    ) {
      selectedCategories = selectedCategories.filter((cat, i) => cat.id !== item.id);
      if (!item.parent_id) {
        selectedCategories = selectedCategories.filter((cat, i) => cat.parent_id !== item.term.id);
        isCatPrimarySelected = false;
        idCatPrimary = "";
      }
    } else {
      if (item.parent_id) {
        const parent = this.props.categories.find(category => {
          return category.term.id === item.parent_id;
        });
        idCatPrimary = parent.term.id;
        if (
          !selectedCategories.find(cat => {
          return cat.id === parent.id;
        })){
          const newItem = {
            id: parent.id,
            taxonomy: parent.taxonomy,
            term: {
              id: parent.term.id,
              name: parent.term.name,
            },
            parent_id: undefined,
          };
          selectedCategories = [...selectedCategories, newItem];
		    }
      }
      else{
        idCatPrimary = item.term.id;
      }
      isCatPrimarySelected = true;
      selectedCategories = [...selectedCategories, item];
    }
    this.setState({ 
      isCatPrimarySelected: isCatPrimarySelected,
      idCatPrimary: idCatPrimary,
      selectedCategories 
    });
    this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...selectedCategories, ...this.state.selectedTags],
    });
  };

  handleCategoryClear = () => {
    this.setState({ 
	  isCatPrimarySelected: false,
	  idCatPrimary: "",
	  selectedCategories: [] 
	});
    this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...this.state.selectedTags],
    });
  };

  handleTagCategoryRemove = (_tag, index) => {
	let isCatPrimarySelected = this.state.isCatPrimarySelected;
	let idCatPrimary = this.state.idCatPrimary;
    const item = this.state.selectedCategories.find(cat => {
      return cat.term.name === _tag;
    });
    let selectedCategories = this.state.selectedCategories;
    selectedCategories = this.state.selectedCategories.filter((cat, i) => i !== index);
    if (!item.parent_id) {
      selectedCategories = selectedCategories.filter((cat, i) => cat.parent_id !== item.term.id);
	  isCatPrimarySelected = false;
	  idCatPrimary = "";
    }
    this.setState({
      isCatPrimarySelected: isCatPrimarySelected,
	  idCatPrimary: idCatPrimary,
      selectedCategories
	});
    this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...selectedCategories, ...this.state.selectedTags],
    });
  };

  filterCategory = (query, item, index) => {
    const entry = _.toLower(`${item.term.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  addTag = item => {
    let selectedTags = this.state.selectedTags;

    if (
      selectedTags.find(cat => {
        return cat.id === item.id;
      })
    ) {
      selectedTags = selectedTags.filter((cat, i) => cat.id !== item.id);
    } else {
      selectedTags = [...selectedTags, item];
    }
    this.setState({ selectedTags });
    this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...selectedTags, ...this.state.selectedCategories],
    });
  };

  handleTagClear = () => {
    this.setState({ selectedTags: [] });
    this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...this.state.selectedCategories],
    });
  };

  handleTagTagRemove = (_tag, index) => {
    let selectedTags = this.state.selectedTags;
    selectedTags = this.state.selectedTags.filter((cat, i) => i !== index);
    this.setState({ selectedTags });
    this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...selectedTags, ...this.state.selectedCategories],
    });
  };

  filterTag = (query, item, index) => {
    const entry = _.toLower(`${item.term.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  handleChangeName = e => {
    this.setState({
      tag: {
        ...this.state.tag,
        name: e.target.value,
      },
    });
  };

  handleChangeCustomUrlFields = (e, fieldName) => {
    this.props.handlePostChange({
      ...this.props.post,
      meta: {
        ...this.props.post.meta,
        [fieldName]: e.target.value
      }
    });
  }

  toggleAddTag = () => this.setState({ isAddTag: !this.state.isAddTag });

  saveTag = async e => {
    const { tag } = this.state;
    this.setState({
      isAddTag: !this.state.isAddTag,
      tag: {
        taxonomy: "post_tag",
        name: "",
        language_id: this.props.defaultLanguage.id,
        parent_id: "",
      },
    });
    const data = await this.props.addTermTaxonomy(tag);
	const taxo = data.response.result.termTaxonomy;
	const newTag = {
      id: taxo.id,
      taxonomy: taxo.taxonomy,
      term: {
        id: taxo.term.id,
        name: taxo.term.name
      },
      parent_id: taxo.parent_id
    };
	this.props.handlePostChange({
      ...this.props.post,
      taxonomies: [...this.props.post.taxonomies,newTag]
    });
  };

  render() {
    const { handleChange, post } = this.props;

    const isCSRChecked = post.taxonomies && (post.taxonomies.length > 0) && post.taxonomies[0].term.name === 'CSR';
    const isPartnerChecked = post.taxonomies && (post.taxonomies.length > 0) && post.taxonomies[0].term.name === 'Partners';

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
      minimal: false,
    });
    const clearButton =
      this.state.selectedPosts.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleClear} />
      ) : null;

    const getTagCategoryProps = (_value, index) => ({
      intent: Intent.NONE,
      minimal: false,
    });
    const clearCategoryButton =
      this.state.selectedCategories.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleCategoryClear} />
      ) : null;

    const getTagTagProps = (_value, index) => ({
      intent: Intent.NONE,
      minimal: false,
    });
    const clearTagButton =
      this.state.selectedTags.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleTagClear} />
      ) : null;

    return (
      <Query
        query={QUERY_GET_TERM_TAXONOMY}
        variables={{ taxonomyCat: "article_category", taxonomyTag: "post_tag", language_id: post.language.id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data, refetch, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error.message;

          const categories = data.categories.filter(tax => tax.taxonomy === "article_category");
          const tags = data.tags.filter(tax => tax.taxonomy === "post_tag");
          const parentCategories = categories.filter(category => !category.parent_id);
          let formattedCategories = [];
          parentCategories.forEach(category => {
            const childCategory = categories.filter(child => child.parent_id === category.term.id);
            formattedCategories.push(category);
            formattedCategories = formattedCategories.concat(childCategory);
          });
          let filterCategories = [];
          formattedCategories.forEach(category => {
            const cat = {
              id: category.id,
              taxonomy: category.taxonomy,
              term: {
                id: category.term.id,
                name: category.term.name,
              },
              parent_id: category.parent_id,
            };
            filterCategories = [...filterCategories, cat];
          });
          let filterTags = [];
          tags.forEach(tag => {
            const newTag = {
              id: tag.id,
              taxonomy: tag.taxonomy,
              term: {
                id: tag.term.id,
                name: tag.term.name,
              },
              parent_id: tag.parent_id,
            };
            filterTags = [...filterTags, newTag];
          });
          return (
            <Fragment>
              {/* Category */}
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="Categories">
                  <TooltipLabel label="Category" required tooltip="Please select categories" />
                  <MultiSelect
                    name="categories"
                    items={filterCategories}
                    popoverProps={{ className: s.suggester }}
                    itemRenderer={this.renderCategoryItem}
                    tagRenderer={this.renderCategoryTag}
                    onItemSelect={this.addCategory}
                    itemPredicate={this.filterCategory}
                    selectedItems={this.state.selectedCategories}
                    tagInputProps={{
                      tagProps: getTagCategoryProps,
                      onRemove: this.handleTagCategoryRemove,
                      rightElement: clearCategoryButton,
                    }}
                    noResults={NoResults}
                  />
                </label>
              </div>

              {
                isCSRChecked && (
                  <Fragment>
                    <div className={cx("w-100 pl-3")}>                  
                      <label className="pt-label" htmlFor="csr_link_title">
                        <input
                          id="csr_link_title"
                          type="text"
                          name="csr_link_title"
                          intent="pt-intent-primary"
                          className="pt-input pt-fill"              
                          value={post.meta && post.meta.csr_link_title}
                          onChange={(e) => this.handleChangeCustomUrlFields(e, 'csr_link_title')}
                          placeholder="CSR Link Title"
                        />
                      </label>
                    </div>
                    <div className={cx("w-100 pl-3")}>                  
                      <label className="pt-label" htmlFor="csr_link_url">
                        <input
                          id="csr_link_url"
                          type="text"
                          name="csr_link_url"
                          intent="pt-intent-primary"
                          className="pt-input pt-fill"              
                          value={post.meta && post.meta.csr_link_url}
                          onChange={(e) => this.handleChangeCustomUrlFields(e, 'csr_link_url')}
                          placeholder="CSR Link Url"
                        />
                      </label>
                    </div>
                  </Fragment>
                ) 
              }

              {
                isPartnerChecked && (
                  <Fragment>
                    <div className={cx("w-100 pl-3")}>                  
                      <label className="pt-label" htmlFor="partner_link_title">
                        <input
                          id="partner_link_title"
                          type="text"
                          name="partner_link_title"
                          intent="pt-intent-primary"
                          className="pt-input pt-fill"              
                          value={post.meta && post.meta.partner_link_title}
                          onChange={(e) => this.handleChangeCustomUrlFields(e, 'partner_link_title')}
                          placeholder="Partner Link Title"
                        />
                      </label>
                    </div>
                    <div className={cx("w-100 pl-3")}>                  
                      <label className="pt-label" htmlFor="partner_link_url">
                        <input
                          id="partner_link_url"
                          type="text"
                          name="partner_link_url"
                          intent="pt-intent-primary"
                          className="pt-input pt-fill"              
                          value={post.meta && post.meta.partner_link_url}
                          onChange={(e) => this.handleChangeCustomUrlFields(e, 'partner_link_url')}
                          placeholder="Partner Link Url"
                        />
                      </label>
                    </div>
                  </Fragment>
                ) 
              }

              {/* Tag */}
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="Tags">
                  <TooltipLabel label="Tag" required tooltip="Please select tags" />
                  <MultiSelect
                    name="tags"
                    items={filterTags}
                    popoverProps={{ className: s.suggester }}
                    itemRenderer={this.renderTagItem}
                    tagRenderer={this.renderTagTag}
                    onItemSelect={this.addTag}
                    itemPredicate={this.filterTag}
                    selectedItems={this.state.selectedTags}
                    tagInputProps={{
                      tagProps: getTagTagProps,
                      onRemove: this.handleTagTagRemove,
                      rightElement: clearTagButton,
                    }}
                    noResults={NoResults}
                  />
                </label>

                {/* add Tag */}
                <div className="d-flex align-items-center pt-control-group">
                  {this.state.isAddTag ? (
                    <input
                      maxLength={20}
                      type="text"
                      name="name"
                      className="pt-input pt-minimal"
                      id="displayName"
                      value={this.state.name}
                      onChange={this.handleChangeName}
                      placeholder="New Tag"
                    />
                  ) : (
                    <span>Add New Tag</span>
                  )}
                  <button
                    className={cx(
                      "pt-button",
                      this.state.isAddTag ? "pt-icon-small-tick pt-intent-success" : "pt-small pt-icon-add mx-2 rounded"
                    )}
                    onClick={
                      this.state.isAddTag
                        ? async () => {
                            await this.saveTag();
                            refetch();
                          }
                        : this.toggleAddTag
                    }
                  />
                  {this.state.isAddTag ? (
                    <button className={cx("pt-button pt-icon-cross pt-intent-danger")} onClick={this.toggleAddTag} />
                  ) : null}
                </div>
              </div>

              {/* Featured */}
              <div className="pt-card pt-elevation-0">
                <Switch label="Featured" name="featured" checked={post.meta.featured} onChange={this.toggleFeatured} />
              </div>
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="selectedPosts">
                  <TooltipLabel label="Also Interesting Lists" tooltip="Please select posts" />
                  <MultiSelect
                    name="also_interesting"
                    items={this.state.posts || []}
                    popoverProps={{ className: cx(s["suggester"], s["suggester-last"]) }}
                    itemRenderer={this.renderPostItem}
                    tagRenderer={this.renderPostTag}
                    onItemSelect={this.addPost}
                    itemPredicate={this.filterPost}
                    selectedItems={this.state.selectedPosts}
                    tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
                  />
                </label>
              </div>
              {/* Featured on Evergreen Page*/}
              <div className="pt-card pt-elevation-0">
                <Switch label="Featured Evergreen" name="featured_evergreen" checked={post.meta.featured_evergreen} onChange={this.toggleFeaturedEvergreen} />
              </div>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

ArticleSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const availableLocales = state.runtime.availableLocales;
  const languages = _.keyBy(Object.values(availableLocales), "id");
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];
  return {    
    posts: (Object.values(state.posts.byId) || [])
        .filter(
          post => post.type === 'article' && 
          (ownProps.post && ownProps.post.language ? post.language.id === ownProps.post.language.id :
          post.language.id === state.runtime.availableLocales[state.runtime.defaultLocale].id)),
    defaultLanguage,
  };
};

export default connect(mapStateToProps, { fetchPosts, addTermTaxonomy })(withStyles(s)(ArticleSidebar));
