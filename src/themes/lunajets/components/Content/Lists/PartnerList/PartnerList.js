import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import { image } from "mock";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import DraftjsDecoder from 'utils/DraftjsDecoder';
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import s from "./PartnerList.scss";
import getUrlFromPost from "utils/getUrlFromPost";

class PartnerList extends React.Component {

  textTruncate = (str, length = 400, ending = '...') => {    
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  fixUrl(url) {
    return url && url.indexOf('http') === -1 ? `http://${url}` : url;
  }

  render() {
    const posts = this.props.corporate;
    const { locale } = this.props;

    return (
      <div className={cx("container-fluid px-0")}>
        {
          posts.map((p, i) =>
            (<div className={cx("row no-gutters", s.desktop)}>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 1}`) : cx(`col-sm-6 col-12 order-${i + 1} order-sm-${i + 2}`)}>
                <FixedRatioImage ratio={0.9} image={p.meta && p.meta.card_image ? p.meta.card_image : p.media} alt={p.title} />
              </div>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 2}`, s["des-wrapper"]) : cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 1}`, s["des-wrapper"])}>
                <FixedRatioContainer ratio={0} className={cx("dk-red-bg", s["content-wrapper"])}>
                  <div className={cx(s["content"])}>
                    <Link to={getUrlFromPost(locale, p)} className={s.title}>
                      <strong className={cx("uppercase text-center px-2 mb-2", s["text"])}>{p.title}</strong>
                    </Link>
                    <span className={cx("text-center px-2")}>{this.textTruncate(p.summary)}</span>
                  </div>
                </FixedRatioContainer>
                <div className={cx("col-12 lt-red-bg", s["bottom-bar", "partner-link-wrapper"], i % 2 == 0 ? "text-right" : "text-left")}>
                  <span>{p.meta.partner_link_title}</span>
                  <br/>
                  <a href={this.fixUrl(p.meta ? p.meta.partner_link_url : '')} className={cx("lt-blue")} >{p.meta.partner_link_url}</a>
                </div>
              </div>
            </div>)
          )
        }
        {
          posts.map((p, i) =>
            (<div className={cx("row no-gutters", s.mobile)}>
              <div className={cx(`col-12`)}>
                <FixedRatioImage ratio={0.9} image={p.media} alt={p.title} />
              </div>
              <div className={cx(`col-12 dk-red-bg`)}>
                <div className={cx(s["content"])}>
                  <Link to={getUrlFromPost(locale, p)}>
                    <strong className={cx("uppercase text-center px-2 mb-2", s["text"])}>{p.title}</strong>
                  </Link>
                  <span className={cx("text-center px-2")}>{this.textTruncate(p.summary)}</span>
                </div>
              </div>
              <div className={cx("col-12 lt-red-bg", s["bottom-bar", "partner-link-wrapper"])}>
                <span>{p.meta.partner_link_title}</span>
                <br/>
                <a href={p.meta.partner_link_url} className={cx("lt-blue")} >{p.meta.partner_link_url}</a>
              </div>
            </div>),
          )
        }
      </div>
    );
  }
}

export default withStyles(s)(PartnerList);
