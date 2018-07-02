import React from "react";
import PropTypes from 'prop-types';
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./EmptyLegsResultWithFilter.css";
import Pagination from "react-js-pagination";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import EmptyLegLink from "../../../Primitives/EmptyLegLink";
import Button from "../../../Primitives/Button";
import EmptyLegRow from "../EmptyLegRow";
import Map from "../../../Widgets/MapBox";
import Loading from "react-loading-animation";

import { FaAngleRight, FaAngleLeft, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/lib/fa";

class EmptyLegsResultWithFilter extends React.Component {
  // This component is used to manage empty legs searching
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      currentPage: 1,
      emptylegs: this.props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: 1,
      emptylegs: nextProps.data,
    });
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const {
      emptylegs, view, pagination, itemsPerPage,
    } = this.props;
    const currentPage = this.state.currentPage;
    const legs = [];
    let slicedEmptyLeg = null;
    if (emptylegs !== null) {
      slicedEmptyLeg = emptylegs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      emptylegs.forEach(emptyleg => {
        const fromCoordinates = emptyleg.from_airport.coordinates.split(",").reverse();
        const toCoordinates = emptyleg.to_airport.coordinates.split(",").reverse();
        legs.push(fromCoordinates);
        legs.push(toCoordinates);
      });
    }
    return (
        <div className={s["empty-legs-result"]}>
          {slicedEmptyLeg ? (
            <div className={cx("container")}>
              {/* number of results [destop only] */}
              <div className={cx("d-none d-sm-block dk-grey", "row", s["number-legs"])}>
                <div className={cx("col")}>
                  <span>
                    Listing {Math.min(currentPage * itemsPerPage, emptylegs.length)} of {emptylegs.length} results
                  </span>
                </div>
              </div>

              {/* list view of empty legs */}
              {view == "list" ? (
                // listing
                <table className={cx(s["empty-legs-listing"])}>
                  {slicedEmptyLeg.map(emptyleg => {
                    return(
                      <EmptyLegLink
                        emptyLegId={emptyleg.id}
                        cityFrom={emptyleg.from_airport.city}
                        cityTo={emptyleg.to_airport.city}
                      >
                        <EmptyLegRow key={emptyleg.id} version={2} emptyleg={emptyleg} />
                      </EmptyLegLink>
                    )
                  })}

                  {/* Desktop only */}
                  { (pagination && emptylegs.length > 0) ?
                    <div className={cx("d-none d-sm-none d-md-block")}>
                      <Pagination
                        prevPageText="prev"
                        nextPageText="next"
                        firstPageText="first"
                        lastPageText="last"
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={this.state.emptylegs.length}
                        pageRangeDisplayed={5}
                        activePage={this.state.currentPage}
                        onChange={this.handlePageChange}
                        innerClass={`pagination ${cx(s["emptyleg-pagination"])}`}
                        itemClass="page-item"
                        linkClass="page-link"
                        linkClassFirst="page-first"
                        linkClassLast="page-last"
                        linkClassPrev="page-prev"
                        linkClassNext="page-next"
                        firstPageText={<FaAngleDoubleLeft width="16" height="16" viewBox="5 8 32 32" />}
                        lastPageText={<FaAngleDoubleRight width="16" height="16" viewBox="5 8 32 32" />}
                        prevPageText={
                          <div>
                            <FaAngleLeft width="16" height="16" viewBox="5 8 32 32" />
                            <span className="pl-4">PREV</span>
                          </div>
                        }
                        nextPageText={
                          <div>
                            <span className="pr-4">NEXT</span>
                            <FaAngleRight width="16" height="16" viewBox="5 8 32 32" />
                          </div>
                        }
                      />
                    </div> : null}

                  {/* Mobile only */}
                  <div className={cx("d-sm-block", { "d-md-none": pagination })}>
                    <div className={cx("row my-5", s["btn-view-all-empty-legs"])}>
                      <div className={cx("col text-center")}>
                        <Button
                          className="btn-outline-primary w-100"
                          textId="VIEW ALL EMPTY LEGS"
                          // textId="client.callToAction.viewAllEmptyLegs"
                          onClick={this.handleDiscoverMore}
                        />
                      </div>
                    </div>
                  </div>
                </table>
              ) : (
                <div className={s["mapbox"]}>
                  <Map type="emptylegs" legs={legs} emptyleg zoomControl scaleControl />
                </div>
              )}
            </div>
          ) : null}
        </div>
    );
  }
}

EmptyLegsResultWithFilter.propTypes = {
  data: PropTypes.array,
  itemsPerPage: PropTypes.number,
  pagination: PropTypes.bool,
  view: PropTypes.string,
};

EmptyLegsResultWithFilter.defaultProps = {
  data: [],
  itemsPerPage: 5,
  pagination: true,
  view: 'list',
};

export default withStyles(s)(EmptyLegsResultWithFilter);
