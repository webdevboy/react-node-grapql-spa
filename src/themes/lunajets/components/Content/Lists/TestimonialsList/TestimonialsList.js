import React, { Component } from "react";
import cx from "classnames";
import { FormattedDate } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./TestimonialsList.scss";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import LoadingSpinner from "../../..//Widgets/LoadingSpinner";

export class Review extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    }
  }

  checkIsMore = (review) => {
    if(review.length > 150) {
      return true;
    }
    return false;
  }

  toggleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  getFormattedDateComponent = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '';

    const dateArr = dateString.split(',');
    return dateArr[0].split(' ').reverse().join(' ') + ',' + dateArr[1];
  }

  render() {
    const { meta, slug } = this.props;

    return (
      <div className={s["review-box"]} >
        {
          this.checkIsMore(meta.review)
          ? <p>
              {this.state.isExpanded ? meta.review : `“${meta.review.slice(0, 150)}... `}
              <span onClick={() => this.toggleExpand()}>
                {this.state.isExpanded ? ' [-]' : '[+]'}
              </span>
              {`”`}
            </p>
          : <p>{`“${meta.review}”`}</p>
        }
        <strong className={s.strong}>
          {`${meta.details.from_airport.city ? meta.details.from_airport.city.name : ''}
          (${meta.details.from_airport.iata ? meta.details.from_airport.iata : ''})
          - ${meta.details.to_airport.city ? meta.details.to_airport.city.name : ''}
          (${meta.details.to_airport.iata ? meta.details.to_airport.iata : ''})`}
        </strong>
        <strong className={s.strong}>
          <span>{`${meta.reviewer_name}, `}</span>
          <FormattedDate
            value={meta.review_date}
            day="numeric"
            month="long"
            year="numeric"
            children={this.getFormattedDateComponent}
          />
        </strong>
      </div>
    )
  }
}

class TestimonialsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reviews, viewMore } = this.props;
    // console.log("####", reviews);
    return (
      <div className={cx("container-fluid lj-pad-y-100", s.root)}>
        <div className="container">
        {reviews
          ? <div className={cx("row lj-pad-y-50", s.content)}>
              { reviews.map((review, index) => (
                <div className="col-lg-4 d-md-flex justify-content-center">
                  {/* <Link to={`/review/${review.slug}`}> */}
                    <Review key={`review-${index}`} {...review} />
                  {/* </Link> */}
                </div>
              ))}
            </div>
          : <LoadingSpinner />
        }
          <div className="row mt-5">
            <div className="col d-flex justify-content-center">
              <a onClick={() => viewMore()} className={cx("btn btn-outline-primary conduit mt-2", s["more-btn"])}>
                <Text defaultMessage="VIEW MORE" id="client.home.reviews.viewMore" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TestimonialsList);
