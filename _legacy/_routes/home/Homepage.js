import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Header from '../../../components/Layout/Header';
import RichMediaHeader from '../../../components/Layout/RichMediaHeader';
import RequestFlight from '../../../components/Forms/RequestFlight';
import Text from '../../../components/Primitives/Text';
import TextHtml from '../../../components/Primitives/TextHtml';
import RichText from '../../../components/Primitives/RichText';

import Image from '../../../components/Primitives/Image';
import Video from '../../../components/Primitives/Video';
import Testimonials from '../../../components/Content/Lists/Testimonials';
import NearbyEmptyLegs from '../../../components/Content/Lists/NearbyEmptyLegs';
import TrendingLocations from '../../../components/Content/Lists/TrendingLocations';
import CertificationsBlock from '../../../components/Content/Home/CertificationsBlock';
import AsSeenOn from '../../../components/Content/Home/AsSeenOn';

import background from './gfx/background.jpg';
import service from './gfx/services.svg';
import price from './gfx/price.svg';
import smart from './gfx/smart.svg';
import video from './gfx/big_buck_bunny.mp4';

import appStore from './gfx/app-store-badge.svg';
import playStore from './gfx/play-store-badge.svg';
import { ArrowRight } from 'react-feather';
import s from './Home.css';

export class Homepage extends Component {
  render() {
    return [
      <RichMediaHeader id="client.home.image.header" defaultSrc={background}>
        <RequestFlight />
      </RichMediaHeader>,
      <div className="container lj-pad-y-50 lj-pad-t-100">
        <div className={cx('row')}>
          <div className={cx('col')}>

            <div className="row">
              <div className="col">
                <span className="section-title lt-blue">
                  <Text defaultMessage="How It Works" id="client.home.howItWorks" />
                </span>
              </div>
            </div>

            <div className="row">
              <div className={cx('col-lg-4 flex-column my-4 my-md-0', s.feature)}>
                <div className={cx('d-flex justify-content-center', s.icon)}><Image source={service} /></div>
                <h2 className="d-flex justify-content-center">
                  <Text defaultMessage="SERVICE" id="client.home.howItWorks.service" />
                </h2>
                <p className="paragraph conduit">
                  <RichText id='client.home.howItWorks.service.paragraph'/>
                </p>
              </div>
              <div className={cx('col-lg-4 flex-column my-4 my-md-0', s.feature)}>
                <div className={cx('d-flex justify-content-center', s.icon)}><Image source={smart} /></div>
                <h2 className="d-flex justify-content-center">
                  <Text defaultMessage="SMART" id="client.home.howItWorks.smart" />
                </h2>
                <p className="paragraph conduit">
                  <RichText id='client.home.howItWorks.smart.paragraph'/>
                </p>
              </div>
              <div className={cx('col-lg-4 flex-column my-4 my-md-0', s.feature)}>
                <div className={cx('d-flex justify-content-center', s.icon)}><Image source={price} /></div>
                <h2 className="d-flex justify-content-center">
                  <Text defaultMessage="PRICE" id="client.home.howItWorks.price" />
                </h2>
                <p className="paragraph conduit">
                  <RichText id='client.home.howItWorks.price.paragraph'/>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>,
      <div className="container lj-pad-y-50">
        <div className={cx('row')}>
          <div className="col">

            <div className="row">
              <div className="col-lg-7">
                <span className="section-title lt-blue">
                  <Text defaultMessage="Mobile App" id="client.home.mobileApp" />
                </span>
                <h1 className="section-heading">
                  <Text defaultMessage="Private Jet At Your FingerTips" id="client.home.mobileApp.jetAtFingerTips" />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <p className="section-paragraph conduit">
                  <RichText id='client.home.mobileApp.jetAtFingerTips.paragraph'/>
                </p>
                <div className={s.badges}>
                  <div className={s.badge}><img src={playStore} /></div>
                  <div className={s.badge}><img src={appStore} /></div>
                </div>
              </div>
              <div className={cx('d-flex col-lg-5 py-4 py-md-0 align-items-center', s.videoCol)}>
                <Video border source={video} />
              </div>
            </div>

          </div>
        </div>
      </div>,
      <div className="container-fluid">
        <div className="row lj-row justify-content-end">
          <a href="#" className={s.lastminute}>
            <Text defaultMessage="Last minute flights, take off in 60 min or less!" id="client.home.lastMinuteFlights.takeOffIn60MinOrLess" />
            <ArrowRight color="#FFF" />
          </a>
        </div>
      </div>,
      <AsSeenOn />,
      <CertificationsBlock />,
      <Testimonials />,
      <NearbyEmptyLegs />,
      <TrendingLocations />,
    ];
  }
}

export default withStyles(s)(Homepage);
