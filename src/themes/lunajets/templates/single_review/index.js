import React, { Component } from 'react'
import Page from '../page';
import { Review } from "../../components/Content/Lists/TestimonialsList";
import s from "../../components/Content/SimpleSubHeader/SimpleSubHeader.scss";
import Button from "../../components/Primitives/Button";
import cx from 'classnames';
import Text from '../../components/Primitives/Text';

export class SingleReview extends Component {
  render() {
    const { post } = this.props;
    return (
      <Page post={post}>
        <div className="container" style={{marginTop: '60px', marginBottom: '60px'}}>
          <div className="row">
            <div className={s['simple-sub-header']}>
              <div className={cx('col')}>
                <span className={`section-title`}>
                  <Text defaultMessage={`What they say about our service`} id={'single.review.appreaciation'} />
                </span>
              </div>
            </div>
          </div>
          <div className={cx('row')}>
            <div className={cx('col-sm-6 col-12', s['paragraph-title'])}>
              <h1>{post.title}</h1>
            </div>
            <div className={cx('col-sm-6 col-12', s['paragraph-button'])}>
              <Button className="btn btn-secondary" defaultMessage="SHARE YOUR EXPERIENCE" textId="client.testimonials.button.shareYourExperience" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Review {...post} />
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default SingleReview
