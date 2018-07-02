import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import { image } from "mock";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import s from "./CorporateList.scss";
import getUrlFromPost from "utils/getUrlFromPost";

class CorporateSocialList extends React.Component {

  fixUrl(url) {
    return url && url.indexOf('http') === -1 ? `http://${url}` : url;
  }

  render() {
    const posts = this.props.corporate;
    const locale = this.props.locale;
    
    return (
      <div className={cx("container-fluid px-0")}>
        {
          posts.map((p, i) =>
            (<div className={cx("row no-gutters", s["desktop"])}>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 1}`) : cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 2}`)}>
                <FixedRatioContainer ratio={0.9} className={cx("dk-blue-bg")}>
                  <div className={cx(s["content"])}>
                    <Link to={getUrlFromPost(locale, p)}>
                      <strong className={cx("uppercase text-center px-2 mb-2", s["text"])}>{p.title}</strong>
                    </Link>
                    <span className={cx("px-2")}>{p.summary}</span>
                  </div>
                </FixedRatioContainer>
              </div>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 1} order-sm-${i + 2}`) : cx(`col-sm-6 col-12 order-${i + 1} order-sm-${i + 1}`)}>
                <FixedRatioImage ratio={0.9} image={(p.meta && p.meta.card_image) || p.media} alt={p.title} />
                <div className={cx("dk-red-bg", s["bottom-bar"], s["csr-link-wrapper"])}>
                  <span>{p.meta ? p.meta.csr_link_title : ''}</span>
                  <br/>
                  <a href={this.fixUrl(p.meta ? p.meta.csr_link_url : '')} className={cx("lt-blue", )} >{p.meta ? p.meta.csr_link_url : ''}</a>
                </div>
              </div>
            </div>),
          )
        }
        {
          posts.map((p, i) =>
            (<div className={cx("row no-gutters", s["mobile"])}>
              <div className={cx(`col-12`)}>
                <FixedRatioImage ratio={0.9} image={(p.meta && p.meta.card_image) || p.media} alt={p.title} />
              </div>
              <div className={cx(`col-12`)}>
                <div className={cx("dk-blue-bg py-2")}>
                  <div className={cx(s["content"])}>
                    <Text strong={true} className={cx("uppercase text-center px-2 mb-2", s["text"])} id={p.post_id} defaultMessage={p.title} />
                    <Text id={p.post_id} className={cx("text-center px-2")} defaultMessage={p.summary} />
                  </div>
                </div>
              </div>
              <div className={cx("dk-red-bg py-1 col-12", s["csr-link-wrapper"])} style={{padding: ".5rem 1rem !important"}}>
                <Text id={p.post_id} defaultMessage={p.meta ? p.meta.csr_link_title : ''} />
                <br/>
                <a href={this.fixUrl(p.meta ? p.meta.csr_link_url : '')} className={cx("lt-blue")} >{p.meta ? p.meta.csr_link_url : ''}</a>
              </div>
            </div>),
          )
        }
      </div>
    );
  }
}

export default withStyles(s)(CorporateSocialList);
