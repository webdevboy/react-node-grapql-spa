import React, { Component } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { graphql } from "react-apollo";
import Button from "../../../Primitives/Button";
import Search from "../../../Widgets/Search";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import Destination from "../Destination";
import s from "./DestinationList.scss";
import getPostsByTemplate from "themes/lunajets/queries/getPostsByTemplate.gql";

const PAGING_SIZE = 9;

class DestinationList extends Component {
  constructor(props) {
    super(props);
    const continents = [
      { text: "All", active: true },
      { text: "Africa", active: false },
      { text: "America", active: false },
      { text: "Asia", active: false },
      { text: "Europe", active: false },
      { text: "Oceania", active: false },
    ];
    this.state = {
      search: "",
      displayCount: PAGING_SIZE,
      continents: [...continents],
    };
    this.loadMore = this.loadMore.bind(this);
    this.search = this.search.bind(this);
  }
  search(keyword) {
    this.setState({
      search: keyword,
      displayCount: PAGING_SIZE
    });
  }
  loadMore() {
    this.setState({
      displayCount: this.state.displayCount + PAGING_SIZE
    });
  }
  selectContinent(selectedContinent) {
    const { continents } = this.state;
    continents.forEach(continent => {
      continent.active = continent == selectedContinent;
    });
    this.setState({
      continents: [...continents],
    });
  }
  filterPosts = (posts) => {
    const { search } = this.state;
    let filteredPosts = posts;
    if (search) {
      const regex = new RegExp(search, "i");
      filteredPosts = posts.filter(post => regex.test(post.city ? post.city.name : ""));
    }
    return filteredPosts;
  }
  render() {
    const { continents, displayCount } = this.state;
    const { loading, posts } = this.props.data;
    const filteredPosts = this.filterPosts(posts);
    return loading ? (
      <LoadingSpinner />
    ) : (
      <div className={cx("container", s["destination-list"])}>
        <div className={cx(s["search"])}>
          <Search onSearch={this.search} />
        </div>
        <div className={cx("row d-sm-block d-none")}>
          <div className={cx("col dk-blue", s["filter"])}>
            {continents.map(continent => (
              <span
                key={continent.text}
                className={cx({ [s.active]: continent.active })}
                onClick={() => {
                  this.selectContinent(continent);
                }}
              >
                {continent.text}
              </span>
            ))}
          </div>
        </div>
        <div className={cx("row")}>
          {filteredPosts.slice(0, displayCount).map(post => <Destination key={post.id} data={post} />)}
        </div>
        {displayCount < filteredPosts.length && (
          <div className={cx("row")}>
            <div className={cx("col d-flex")}>
              <Button
                className={cx("btn-outline dk-blue", s["btn-load-more"])}
                textId="button.loadMore"
                defaultMessage="load more"
                onClick={this.loadMore}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(
  graphql(getPostsByTemplate, {
    options: {
      variables: {
        type: "page",
        template: "private-jet-charter-destination",
      },
      notifyOnNetworkStatusChange: true,
    },
  })(DestinationList),
);
