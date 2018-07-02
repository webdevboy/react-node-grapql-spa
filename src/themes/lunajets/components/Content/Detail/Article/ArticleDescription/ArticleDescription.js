import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import _ from "lodash";
import DraftjsDecoder from "utils/DraftjsDecoder";
import Text from "../../../../Primitives/Text";
import s from "./ArticleDescription.css";

class ArticleDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const post = this.props.post;

    var jsonBody;
    const body = post.body.main;    
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    return (
      <div className={s["article-description"]}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            {/* paragraphe */}
            <div className={cx("col-md-12")}>
              <div className={s["description-wrap"]}>
                <DraftjsDecoder contentState={jsonBody} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ArticleDescription);
