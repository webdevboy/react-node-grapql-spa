import React, { Component, Fragment } from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";

import { image } from "mock";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import s from "./CorporateList.scss";
import MediaGallery from "admin/components/MediaGallery";
import TiPencil from "react-icons/lib/ti/pencil";
import { updateOrCreateMediaReference, setRichMediaList } from "shared/actions/media";
import { fetchMedia } from "admin/actions/media";
import history from 'core/history';
import Loading from "react-loading-animation";
import getUrlFromPost from "utils/getUrlFromPost";

class CorporateList extends Component {

  render() {
    const posts = this.props.corporate;
    const { locale } = this.props;
    
    return (
      <div className={cx("container-fluid px-0")}>
        {
          posts.map((p, i) =>
            (<div className={cx("row no-gutters")}>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 1} mt-sm-3 px-sm-2`) : cx(`col-sm-6 col-12 order-${i + 1} order-sm-${i + 2} mt-sm-3 px-sm-2`)}>
                <FixedRatioImage ratio={0.8} image={(p.meta.card_image) || p.media} alt={p.title} />
              </div>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 2} mt-sm-3 px-sm-2`) : cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 1} mt-sm-3 px-sm-2`)}>
                <FixedRatioContainer ratio={0.8} className={cx("dk-red-bg")}>
                  <div className={cx(s["content"])}>
                    <strong className={cx("uppercase text-center px-2", s["text"])} >{p.title}</strong>
                    <Link to={getUrlFromPost(locale, p)} className={cx("btn-outline white", s["btn-read-more"])}>
                      <Text className={cx("uppercase text-center white")} defaultMessage={`READ MORE`} id={'client.corporate.list.readmore'}/>
                    </Link>
                  </div>
                </FixedRatioContainer>
              </div>
            </div>),
          )
        }
      </div>
    );
  }
}

export default withStyles(s)(CorporateList);
