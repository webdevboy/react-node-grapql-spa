import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './OurTips.css';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from 'core/history';
import Text from '../../../Primitives/Text';
import Image from '../../../Primitives/Image';

class OurTips extends Component {
  constructor(props) {
    super(props);
    this.handleDiscoverMore = this.handleDiscoverMore.bind(this);
    const { data: { categories }, getArticleFct } = this.props;
    this.state = { data: categories[0].articles, display: 1 };
  }

  componentDidMount() {
    // console.log(this.props);
  }

  goTo = (id) => {
    history.push(`${this.props.linkToDetail}/${id}`);
  }

  async handleDiscoverMore() {
    const { data: { categories } } = await this.props.getArticleFct(this.state.data.length);
    const articles = categories[0].articles;
    let articlesFiltered = [];
    let displayValue = 1;
    if (articles.length === 11) {
      articlesFiltered = articles.slice(0, 10);
    } else {
      displayValue = 0;
      articlesFiltered = articles;
    }
    const oldData = Array.from(this.state.data);
    articlesFiltered.map((article) => { oldData.push(article); });
    this.setState({ data: oldData, display: displayValue });
  }

  getArticleElement = (article, cssClasses) => (
    <div className={cx(s.article, ...cssClasses.map(cssClass => s[cssClass]))}>
      {article.media ? <Image source={article.media.src} width="100%" height="100%" alt={article.media.filename} title={article.media.filename} /> : null}
      <div className={cx(s.description)}>
        <a className={cx()} href={`/evergreen/news/${article.slug}`}>
          <span className="conduit white bold" >
            {article.title}
          </span>
        </a>
      </div>
    </div>
  )

  getArticleBlock1 = (articles) => {
    const articleElements = articles.map((article, index) => {
      let element = null;
      if (index == 0) {
        element = this.getArticleElement(article, ['square', 'title-half-width']);
      } else {
        element = this.getArticleElement(article, ['square']);
      }
      return element;
    });
    return (
      <div className={cx('row ml-0')}>
        <div className={cx('col-sm pl-0')}>
          {articleElements[0]}
        </div>
        <div className={cx('col-sm pl-0')}>
          <div className={cx('row ml-0')}>
            <div className={cx('col-sm-6 pl-0')}>
              {articleElements[1]}
            </div>
            <div className={cx('col-sm-6 pl-0')}>
              {articleElements[2]}
            </div>
            <div className={cx('col-sm-6 pl-0')}>
              {articleElements[3]}
            </div>
            <div className={cx('col-sm-6 pl-0')}>
              {articleElements[4]}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getArticleBlock2 = (articles) => {
    const articleElements = articles.map((article, index) => {
      let element = null;
      switch (index) {
        case 0:
          element = this.getArticleElement(article, ['rectangle1x2']);
          break;
        case 1:
        case 4:
          element = this.getArticleElement(article, ['rectangle2x1', 'title-half-width']);
          break;
        case 2:
        case 3:
          element = this.getArticleElement(article, ['square']);
          break;
      }
      return element;
    });
    return (
      <div className={cx('row ml-0')}>
        <div className={cx('col-3 pl-0')}>
          {articleElements[0]}
        </div>
        <div className={cx('col pl-0')}>
          <div className={cx('row ml-0')}>
            <div className={cx('col-8 pl-0')}>
              {articleElements[1]}
            </div>
            <div className={cx('col pl-0')}>
              {articleElements[2]}
            </div>
          </div>
          <div className={cx('row ml-0')}>
            <div className={cx('col pl-0')}>
              {articleElements[3]}
            </div>
            <div className={cx('col-8 pl-0')}>
              {articleElements[4]}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const articles = this.state.data;
    const displayValue = this.state.display;

    function splitData(articles) {
      let i,
        j,
        chunk = 5;
      const newArray = [];
      for (i = 0, j = articles.length; i < j; i += chunk) {
        newArray.push(articles.slice(i, i + chunk));
      }
      return newArray;
    }

    const newArray = splitData(articles);

    return (
      <div className={s['section-news']}>
        <div className={cx('container-fluid')}>
          {/* Desktop + Tablet only */}
          <div className={cx('d-none d-sm-block')}>
            {
            this.getArticleBlock1(newArray[0])
          }
            {
            newArray.slice(1).map(articles => this.getArticleBlock2(articles))
          }
          </div>
          {/* Phone only */}
          <div className={cx('d-block d-sm-none')}>
            {
            articles.map(article => (
              <div className={cx('row ml-0')}>
                <div className={cx('col pl-0')}>
                  {
                    this.getArticleElement(article, ['square'])
                  }
                </div>
              </div>
            ))
          }
          </div>
          {/* button discover more */}
          {(displayValue === 1) &&
            <div className={cx('row', s['btn-discover-more'])}>
              <div className={cx('col')}>
                <a className={cx('btn btn-outline dk-blue')} onClick={this.handleDiscoverMore} >
                  <Text defaultMessage="load more" id="client.callToAction.loadMore"/>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}


OurTips.propTypes = {
  data: PropTypes.array,
  linkToDetail: PropTypes.string,
};

OurTips.defaultProps = {
  data: {},
  linkToDetail: '/articles',
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(OurTips));
