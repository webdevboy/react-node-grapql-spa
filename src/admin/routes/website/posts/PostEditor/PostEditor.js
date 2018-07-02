import React, { Component } from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { connect } from "react-redux";
import { Toaster, Position, Intent, Alert } from "@blueprintjs/core";
import { Mutation, Query } from "react-apollo";

import s from "./PostEditor.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import Page from "admin/components/Page";
import TooltipLabel from "admin/components/TooltipLabel";
import UPSERT_POST from "admin/mutations/addPosts.graphql";
import QUERY_AVAILABLE_PATH_POSTS from "./queries/availablePathPosts.graphql";
import history from "core/history";
import CommonSidebar from "../Sidebars/Common";
import { PostTypes, CardPostTypes } from "admin/routes/website/posts/PostTypes";
import LoadingSpinner from "admin/components/LoadingSpinner";
import getUrlFromPost from "utils/getUrlFromPost";

class PostEditor extends Component {
  refHandlers = {
    toaster: ref => (this.toaster = ref),
  };

  constructor(props) {
    super(props);
    const { edit, type, post, transParent, categories, transLanguage, isTranslate, isDuplicate, languages } = props;
    const defaultPost = this.getDefaultPost(type);
    const originPost = post || defaultPost;
    if (transLanguage) {
      let { id, title, summary, body, meta, ...newPost } = originPost;

      if (isTranslate) {
        this.state = {
          post: {
            title: "",
            body: { main: "", sub: "" },
            summary: "",
            meta: {
              pathUrl: transParent,
              template: meta.template,
            },
            ...newPost,
            taxonomies: [],
            language: languages[transLanguage] || originPost.language,
            media_id: originPost.media ? originPost.media.id : null,
          },
        };
      }
      if (isDuplicate) {
        this.state = {
          post: {
            title: originPost.title,
            body: originPost.body,
            summary: originPost.summary,
            meta: {
              pathUrl: transParent,
              template: meta.template,
            },
            ...newPost,
            taxonomies: [],
            language: languages[transLanguage] || originPost.language,
            media_id: originPost.media ? originPost.media.id : null,
          },
        };
      }
    } else {
      this.state = {
        post: {
          ...originPost,
          taxonomies: originPost.taxonomies || [categories[0]],
        },
        previewMode: false,
      };
    }
    this.clonePost = _.cloneDeep(this.state.post);
    this.state.cancelWarning = false;
    this.state.isSaving = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({
        post: this.getDefaultPost(nextProps.type),
      });
    }
  }

  getActions = () => {
    return [
      // (this.state.post && this.state.post.post_id) ? {
      //   key: "action-preview",
      //   icon: "pt-icon-eye-open",
      //   intent: "pt-intent-primary",
      //   action: () => this.preview(),
      //   label: "Preview",
      // } : null,
      {
        key: "action-confirm",
        icon: "pt-icon-confirm",
        intent: "pt-intent-success",
        action: () => this.save(),
        label: "Save",
        saving: this.state.isSaving,
      },
      {
        key: "action-cancel",
        icon: "pt-icon-undo",
        intent: "pt-intent-default",
        action: () => (_.isEqual(this.clonePost, this.state.post) ? this.cancel(true) : this.cancel()),
        label: "Close",
      },
    ];
  }

  getDefaultPost = type => {
    const currentType = PostTypes[type];
    return {
      type: currentType ? currentType.type : "",
      body: { main: "", sub: "" },
      meta: { template: currentType ? currentType.template : "", pathUrl: {} },
      title: "",
      summary: "",
      state: "draft",
      language: this.props.defaultLanguage,
      taxonomies: [],
    };
  };

  handleChange = e => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value,
      },
    });
  };

  handlePostChange = post => {
    this.setState({ post });
  };

  onPostTypeChanged = type => {
    //const currentType = PostTypes[type];
    const currentType = type;
    this.setState({
      post: {
        ...this.state.post,
        type: currentType.type,
        meta: {
          template: currentType.template,
        },
      },
    });
  };

  onBodyMainChange = (main,mainText) => {
    this.setState({
      post: {
        ...this.state.post,
        body: {
          ...this.state.post.body,
          main,
          mainText,
          sub: this.state.post.body ? this.state.post.body.sub : "",
          subText: this.state.post.body && this.state.post.body.subText ? this.state.post.body.subText : "",
        },
      },
    });
  };

  onBodySubChange = (sub,subText) => {
    this.setState({
      post: {
        ...this.state.post,
        body: {
          main: this.state.post.body ? this.state.post.body.main : "",
          mainText: this.state.post.body && this.state.post.body.mainText ? this.state.post.body.mainText : "",
          sub,
          subText,
        },
      },
    });
  };

  onMetaChange = newMeta => {
    this.setState({
      post: {
        ...this.state.post,
        meta: newMeta,
      },
    });
  };

  preview = async () => {
    if (this.state.post) {
      const {
        data: { post },
      } = await this.save(true);

      const {
        slug,
        type,
        language: { locale },
      } = post;
      const port = __DEV__ ? `:${window.App.port}` : "";
      const subDomain = __DEV__ ? '' : 'www.';
      const basePath = `https://${subDomain}${window.App.hostname}${port}`;
      const previewRouterStr = basePath + getUrlFromPost (this.state.post.language.locale, this.state.post);

      window.open(previewRouterStr, "_blank");
    }
  };

  validatePost(post) {
    let message = "";

    if (!post.type) {
      message = "Please select a post type";
    } else if (!post.title) {
      message = "Please fill title";
    } else if (post.summary && post.summary.length > 160) {
      message = "Summary length " + post.summary.length + " is more than 160 characters allowed!";
    }
    return message;
  }

  validateEventPost(post) {
    let message = "";
    if (!post.meta) {
      message = "Please fill event meta data";
    } else {
      if (!post.meta.city_sfid) {
        message = "Please fill event city";
      } else if (!post.meta.from_date) {
        message = "Please fill event from date";
      } else if (!post.meta.to_date) {
        message = "Please fill event to date";
      }
    }

    return message;
  }

  save = async previewMode => {
    const { post } = this.state;
    this.setState({
      previewMode,
    });

    let errorMessage = this.validatePost(post);
    if (!errorMessage) {
      if (post.type === "event") {
        errorMessage = this.validateEventPost(post);
      }
    }

    if (errorMessage) {
      this.toaster.show({
        message: errorMessage,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
      return;
    }

    if (previewMode && post.state !== "published") {
      post.state = "draft";
    }
    this.setState({
      isSaving: true,
    });
    const taxonomyIds = _.map(post.taxonomies, "id");
    //Generate url just for aircraft page
    let link = "";
    if (post.type === "aircraft"){
      const port = __DEV__ ? `:${window.App.port}` : "";
      const subDomain = __DEV__ ? '' : 'www.';
      const basePath = `https://${subDomain}${window.App.hostname}${port}`;
      link = basePath + getUrlFromPost (post.language.locale, post);
    }
    //Generate the search string here
    let search_content = post.title.concat(" ");
    search_content = post.body && post.body.mainText ? search_content.concat(post.body.mainText, " ") : search_content;
    search_content = post.body && post.body.subText ? search_content.concat(post.body.subText, " ") : search_content;
    const newPost = {
      ...post,
      meta: {
        ...post.meta,
        search_content: search_content.toLowerCase(),
      }
    };
    this.toaster.clear();
    const updated = await this.upsertPost({
      variables: {
        ...newPost,
        language_id: post.language.id,
        taxonomies: taxonomyIds,
        linkUrl: link,
      },
    });
    this.setState({
      isSaving: false,
    });
    this.clonePost = _.cloneDeep(this.state.post);

    return updated;
  };

  onUpsertCompleted = ({ post }) => {
    if (!this.state.previewMode) {
      this.toaster.show({
        message: "Saved!",
        timeout: 3000,
        intent: Intent.SUCCESS,
        iconName: "pt-icon-success",
      });
      this.setState({
        post: {
          ...post,
        },
      });
      const subRouterStr = this.getSubRouterStr();
      history.push(`/website/${subRouterStr}/edit/${post.id}`);
    }
  };

  onUpsertError = error => {
    this.toaster.show({
      message: error.message,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    });
  };

  cancel = force => {
    if (force) {
      this.confirmCancelWarning();
    }
    this.setState({ cancelWarning: true });
  };

  getSubRouterStr = () => {
    let subRouterStr = "";
    if (this.state.post) {
      subRouterStr = this.state.post.type || "page";
    }
    return subRouterStr + "s";
  };

  getCurrentType = () => {
    const { post } = this.state;
    let currentType;
    if (post.type == "page") {
      currentType = PostTypes[post.meta && post.meta.template];
    } else {
      currentType = PostTypes[post.type];
    }
    return currentType;
  };
  getCustomSidebar = () => {
    const { post } = this.state;
    const { categories, tags, isEdit, isTranslate, isDuplicate } = this.props;
    const currentType = this.getCurrentType();
    const CustomSidebar = currentType && currentType.sidebar;

    return (
      CustomSidebar && (
        <CustomSidebar
          onMetaChange={this.onMetaChange}
          handleChange={this.handleChange}
          handlePostChange={this.handlePostChange}
          post={post}
          categories={categories}
          tags={tags}
          isEdit={isEdit}
          isTranslate={isTranslate}
          isDuplicate={isDuplicate}
          currentRoute={this.props.currentRoute}
        />
      )
    );
  };

  getEditorInfo = () => {
    const { post } = this.state;
    const currentType = Object.values(PostTypes).find(
      postType => postType.template == (post.meta ? post.meta.template : post.type),
    );
    const result = {
      main: currentType && currentType.editor,
      sub: currentType && currentType.subeditor,
    };
    return result;
  };

  getSubEditor = () => {
    const { post } = this.state;
    return (
      this.getEditorInfo().sub && <Editor onChange={this.onBodySubChange} value={post.body ? post.body.sub : ""} />
    );
  };

  getSelectTypeOptions = () => {
    if (this.props.type) return null;
    return Object.values(PostTypes).filter(postType => postType.type === "page").sort();
  };

  getMode = () => (this.state.post.id ? "Edit" : "Add");

  getSubEditorName = () => {
    const { post } = this.state;
    let subEditorName = "";
    if (post.type && post.type === "event") {
      subEditorName = "Helicopter Transfer Description";
    }
    return subEditorName;
  };

  getMainEditorName = () => {
    const { post } = this.state;
    let mainEditorName = "Description";
    if (post.type && post.type) {
      let type = post.type;
      mainEditorName = type.charAt(0).toUpperCase() + type.slice(1) + " Description";
    }
    return mainEditorName;
  };

  getBreadcumbsName = () => {
    const { post } = this.state;
    let postName = "Add Post";
    let postMode = "Add ";
    let postType = "post";
    if (post && post.id) {
      postMode = "Edit ";
    }

    if (post && post.type) {
      postType = post.type;
    }

    postName = postMode + postType;
    return postName;
  };

  confirmCancelWarning = () => {
    const subRouterStr = this.getSubRouterStr();
    history.push(`/website/${subRouterStr}`);
  };

  cancelWarning = () => {
    this.setState({ cancelWarning: false });
  };

  hasCardImage = (type) => {
    return CardPostTypes.indexOf(type) !== -1;
  }

  render() {
    let { currentRoute } = this.props;
    const { post } = this.state;
    let currentEditorType = null;

    if (post.type) {
      if (post.type === "page") {
        currentEditorType = post.meta.template;
      } else {
        currentEditorType = post.type;
      }
    }

    currentRoute["name"] = this.getBreadcumbsName();
    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    return (
      <Page
        interfaces={this.getSelectTypeOptions()}
        actions={this.getActions()}
        breadcrumbs={breadcrumbs}
        handleInterfaceChanged={this.onPostTypeChanged}
      >
        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.cancelWarning}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmCancelWarning}
          cancelButtonText="Cancel"
          onCancel={this.cancelWarning}
        >
          <span>You have unsaved changes, are you sure you want to quit?</span>
        </Alert>
        <Query
          query={QUERY_AVAILABLE_PATH_POSTS}
          variables={{ language_id: post.language.id, type: "page" }}
          notifyOnNetworkStatusChange={true}
        >
          {({ loading, data, error }) => {
            if (loading) return <LoadingSpinner />;
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={UPSERT_POST}
                onCompleted={data => this.onUpsertCompleted(data)}
                onError={err => this.onUpsertError(err)}
              >
                {(upsertPost, { loading, error }) => {
                  this.upsertPost = upsertPost;
                  const editorInfo = this.getEditorInfo();

                  return (
                    <div className={s.post}>
                      <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

                      <div className={s["editor-wrap"]}>
                        {editorInfo.main && (
                          <div className={s["main-editor"]}>
                            <div className={s["editor-title"]}>
                              <span>{this.getMainEditorName()}</span>
                            </div>
                            <Editor
                              currentRoute={currentRoute}
                              onChange={this.onBodyMainChange}
                              value={post.body ? post.body.main : ""}
                            />
                          </div>
                        )}

                        {editorInfo.sub ? (
                          <div className={s["sub-editor"]}>
                            <div className={s["editor-title"]}>
                              <span>{this.getSubEditorName()}</span>
                            </div>
                            {this.getSubEditor()}
                          </div>
                        ) : (
                          <div className={cx(s["sub-editor"], "d-none")} />
                        )}
                      </div>
                      <Sidebar expandable fixed>
                        <form onSubmit={e => e.preventDefault()} className="content">
                          <div className="header">
                            <h4>{currentEditorType || "Please select a type"}</h4>
                          </div>
                          <div className="body">
                            <CommonSidebar
                              handleChange={this.handleChange}
                              handlePostChange={this.handlePostChange}
                              onMetaChange={this.onMetaChange}
                              post={this.state.post}
                              currentRoute={currentRoute}
                              availablePathPosts={data.availablePathPosts}
                              showCardImage={this.hasCardImage(currentEditorType)}
                            />
                            {this.getCustomSidebar()}
                          </div>
                        </form>
                      </Sidebar>
                    </div>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </Page>
    );
  }
}

PostEditor.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const availableLocales = state.runtime.availableLocales;
  const languages = _.keyBy(Object.values(availableLocales), "id");
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];

  const taxonomies = state.termTaxonomy.ids;
  const post = ownProps.post;
  //Filter categories by language
  let postLang_id = defaultLanguage.id;
  if (post) {
    postLang_id = ownProps.transLanguage ? ownProps.transLanguage : post.language.id;
  }
  const categories = taxonomies.filter(
    taxonomy => taxonomy.taxonomy === "article_category" && taxonomy.term.language_id === postLang_id,
  );
  const tags = taxonomies.filter(taxonomy => taxonomy.taxonomy === "post_tag");

  return {
    languages,
    categories,
    tags,
    defaultLanguage,
    post,
  };
};

export default connect(mapStateToProps)(withStyles(s)(PostEditor));
