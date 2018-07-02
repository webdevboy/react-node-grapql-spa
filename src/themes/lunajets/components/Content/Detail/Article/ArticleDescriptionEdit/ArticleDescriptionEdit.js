import React from 'react';
import { FormattedDate } from "react-intl";
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import ContentEditor from '../../../../ContentEditor';
import { convertJsonToHtml } from 'utils/convertJsonToHtml';
import s from './ArticleDescriptionEdit.css';
import Text from '../../../../Primitives/Text';

class ArticleDescriptionEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { jobs } = this.state;
    const { data: { article } } = this.props;

    return (
      <div className={s['article-description']}>
        <div className={cx('container-fluid')}>
          <div className={cx('row')}>

            {/* paragraphe */}
            <div className={cx('col-md-12')}>
              <div className={s['description-wrap']}>
                <ContentEditor value={article.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default (withStyles(s)(ArticleDescriptionEdit));
