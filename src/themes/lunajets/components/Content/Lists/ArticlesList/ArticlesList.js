import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from 'core/history';
import s from "./ArticlesList.css";

const QUERY = gql`query($id: ID!) { 
  article: getArticle(id: $id) { id, title, summary, body }
}`;

class ArticlesList extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  goTo = (id) => {
    this.props.linkToDetail(id)
  }

  render() {
    const { data: { articles }, linkToDetail } = this.props;
    // console.log('INSIDE COMPONENT ARTICLES LIST => ', articles);
    return (
      <div className={s.root}>
        {
          articles.map(article => <li>
            <h2 onClick={() => this.goTo(article.id)}>{article.title}</h2>
            <p>
              {article.summary}
            </p>
          </li>)
        }
      </div>
    );
  }
}

ArticlesList.propTypes = {
  linkToDetail: PropTypes.func,
}

ArticlesList.defaultProps = {
  data: {
    articles: []
  },
  linkToDetail: (id) => {
    history.push(`/articles/${id}`)
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(
    graphql(QUERY)(ArticlesList),
  )
);
