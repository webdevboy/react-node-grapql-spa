import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./Article.css";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from 'core/history';
import {stateToHTML} from 'draft-js-export-html';

class Article extends Component {

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    const { data: { article } } = this.props;

    return (
      <div className={s.root}>
        <h2>{article.title}</h2>
        <p>
          {article.summary}
        </p>
      </div>
    );
  }
}

Article.propTypes = {
  data: PropTypes.array,
}

Article.defaultProps = {
  data: {},
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Article));
