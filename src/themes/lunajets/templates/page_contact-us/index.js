import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import Instagram from "react-feather/dist/icons/instagram";
import Youtube from "react-icons/lib/io/social-youtube-outline";
import LinkedIn from "react-icons/lib/fa/linkedin";
import Twitter from "react-icons/lib/fa/twitter";
import Facebook from "react-icons/lib/fa/facebook";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { injectIntl } from 'react-intl';
import * as _ from 'lodash';
import Header from "themes/lunajets/components/Layout/Header";
import CorporateList from 'themes/lunajets/components/Content/Corporate/CorporateList';
import MapBox from "themes/lunajets/components/Widgets/MapBox";
import Page from '../page';
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql';
import GET_SETTINGS from 'shared/queries/getSettings.gql'
import Text from "../../components/Primitives/Text";
import Link from "../../components/Primitives/Link";
import Input from '../../components/Primitives/Input';
import TextArea from '../../components/Primitives/TextArea';
import s from "./page.scss";
import OfficeList from '../../components/Content/Lists/OfficeList';

export class ContactUs extends Component {
  
  sendMail = (e, email) => {
    e.preventDefault();
    window.open(`mailto:${email}`);
  }

  render() {
    const { hreflangs, intl } = this.props;
    const { post } = this.props;

    const heading = {
      title: {
        defaultMessage: 'Connect with lunajets',
        id: "client.banner.title.",
      },
      phone: {
        defaultMessage: '+41 844 041 844',
        id: "client.banner.phone",
      },
      email: {
        defaultMessage: 'lunajets@lunajets.com',
        id: "client.banner.email",
      }
    };

    const phone = intl.formatMessage({id: 'client.banner.phone', defaultMessage: "+41 844 041 844" });
    const email = intl.formatMessage({id: 'client.banner.email', defaultMessage: 'lunajets@lunajets.com' });
    const inputPencilStyle = {
      zIndex: 1,
      color: 'var(--corporate-blue)',
      top: '5px',
      right: '15px'
    };
    const submitPencilStyle = {
      zIndex: 1,
      color: 'white',
      top: '5px',
      right: '15px'
    }
    
    return (
      <Page post={post} hreflangs={hreflangs}>
        <div className={cx(s["custom-header"])}>
          <div className={cx(s["map-box"])}>
            <Query query={GET_POSTS} variables={{ type: 'office' }}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;              
                
                const locations = data.posts.map(location => {
                  return {
                    ...location,
                    coordinates: `${location.meta.coordinates.lat}, ${location.meta.coordinates.lng}`,
                    name: location.title,
                    email: location.meta.email,
                    phone: location.meta.phone
                  };
                });

                return <MapBox type="marker" locations={locations} />;
              }}
            </Query>
            <div className={cx(s["map-overlay"])} />
          </div>
          <div className={cx(s["content"])}>
            <Text isHeader={true} className="uppercase corporate-blue" id={heading.title.id} defaultMessage={heading.title.defaultMessage} />
            <div className="my-2">
              <i className="fa fa-phone dk-red mx-2" />
              <a href={`tel:${phone}`}>
                <Text className="dk-red" id={heading.phone.id} defaultMessage={heading.phone.defaultMessage} />              
              </a>
            </div>
            <div className="my-2">
              <i className="fa fa-envelope-o dk-red mx-2" />
              <a href="#" onClick={(e) => this.sendMail(e, email)}>
                <Text className="dk-red" id={heading.email.id} defaultMessage={heading.email.defaultMessage} />
              </a>
            </div>

            <Query query={GET_SETTINGS}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;

                const urls = {};
                const urlNames = ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube'];

                urlNames.forEach(urlName => {
                  const urlObject = _.find(data.settings, { option: `social_media_${urlName}` });
                  urls[urlName] = urlObject ? urlObject.value : '#';
                })

                return (
                  <div className={cx(s["social-links"])}>
                    <ul className={cx("m-0")}>
                      <li>
                        <a href={urls.facebook} target="_blank" text="" className="header_social">
                          <Facebook size={30} color="#3e5970" />
                        </a>
                      </li>
                      <li>
                        <a href={urls.twitter} target="_blank" text="" className="header_social">
                          <Twitter size={30} color="#3e5970" />
                        </a>
                      </li>
                      <li>
                        <a href={urls.linkedin} target="_blank" text="" className="header_social">
                          <LinkedIn size={30} color="#3e5970" />
                        </a>
                      </li>
                      <li>
                        <a href={urls.instagram} target="_blank" text="" className="header_social">
                          <Instagram size={30} color="#3e5970" />
                        </a>
                      </li>
                      <li>
                        <a href={urls.youtube} target="_blank" text="" className="header_social">
                          <Youtube size={30} color="#3e5970" />
                        </a>
                      </li>
                    </ul>
                  </div>
                );
              }}
            </Query>
          </div>
          <div className={cx("d-none d-sm-flex", s["search-bar"])}>
            <input placeholder="How may we help you?" type="text" className={cx("form-control", s.search)} />
          </div> 
          {/* <div className={cx(s["header-container"], "container")}>
            <div className={cx(s["content"], "row w-100")}>
              <div className="col-12 col-sm-6">
                <Text isHeader={true} className="uppercase corporate-blue" id={heading.title.id} defaultMessage={heading.title.defaultMessage} />
                <div className="my-2">
                  <i className="fa fa-phone dk-red mx-2" />
                  <a href={`tel:${phone}`}>
                    <Text className="dk-red" id={heading.phone.id} defaultMessage={heading.phone.defaultMessage} />              
                  </a>
                </div>
                <div className="my-2">
                  <i className="fa fa-envelope-o dk-red mx-2" />
                  <a href="#" onClick={(e) => this.sendMail(e, email)}>
                    <Text className="dk-red" id={heading.email.id} defaultMessage={heading.email.defaultMessage} />
                  </a>
                </div>
                <div className={cx(s["social-links"])}>
                  <ul className={cx("m-0")}>
                    <li>
                      <Link to="#" text="" className="header_social" />
                      <Facebook size={30} color="#3e5970" />
                    </li>
                    <li>
                      <Link to="#" text="" className="header_social" />
                      <Twitter size={30} color="#3e5970" />
                    </li>
                    <li>
                      <Link to="#" text="" className="header_social" />
                      <LinkedIn size={30} color="#3e5970" />
                    </li>
                    <li>
                      <Link to="#" text="" className="header_social" />
                      <Instagram size={30} color="#3e5970" />
                    </li>
                    <li>
                      <Link to="#" text="" className="header_social" />
                      <Youtube size={30} color="#3e5970" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className={cx("col-12 my-4 d-none d-sm-flex", s["search-bar"])}>
                <input placeholder="How may we help you?" type="text" className={cx("form-control", s.search)} />
              </div>
            </div>
          </div>*/}
        </div> 
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-7 py-4 order-2 order-sm-1">
              <div>
                <span className={`section-title lt-blue`}><Text className="uppercase" defaultMessage="Lunajets network" id="client.list.sectionTitle" /></span>
              </div>
              <Query query={GET_POSTS} variables={{ type: 'office', language_id: this.props.lang_id }}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;
      
                return <OfficeList offices={data.posts} />
              }}
              </Query>
            </div>
            <div className="col-12 col-sm-5 dk-blue-bg p-3 p-sm-5 order-1 order-sm-2">
              <div className="col-12">
                <Text strong={true} className="uppercase" style={{fontSize: "30px"}} id="client.form.title" defaultMessage="let's talk" />
              </div>
              <div className="col-12 mb-5">
                <Text className="lt-blue" id="client.form.detail" defaultMessage="Get in touch with a Private Aviation Advisor instantly." />
              </div>
              <div className="col-12 my-2">
                <TextArea elementId="msg_contact" id="msg_contact" placeholder="How may we help you?" placeholderId="client.page-contact-us.help" rows="6" className={cx("form-control", s["border-flat"])} pencilStyle={inputPencilStyle} />
              </div>
              <div className="col-12 my-2">
                <Input elementId="subject_contact" placeholder="Subject" placeholderId="client.page-contact-us.subject" className={cx("form-control", s["input"])} pencilStyle={inputPencilStyle} type="text" />
              </div>
              <div className="col-12 my-2">
                <Input elementId="name_contact" placeholder="Full Name" placeholderId="client.page-contact-us.full-name" className={cx("form-control", s["input"])} pencilStyle={inputPencilStyle} type="text" />
              </div>
              <div className="col-12 my-2">
                <Input elementId="mail_contact" placeholder="Email" placeholderId="client.page-contact-us.mail" className={cx("form-control", s["input"])} pencilStyle={inputPencilStyle} type="email" />
              </div>
              <div className="col-12 my-3">
                <Input value="send message" placeholderId="client.page-contact-us.subject"  className={cx("form-control btn uppercase dk-grey-bg")} pencilStyle={submitPencilStyle} type="submit" />
              </div>
              <div className="col-12 mt-5">
                <Text pclassName="lt-blue" id="client.form.sendEmail" defaultMessage="If you prefer, send us an email." />
              </div>
              <div className="col-12 mt-3">
                <Input value="email us" placeholderId="client.page-contact-us.email-us" className={cx("form-control btn uppercase dk-red-bg")} pencilStyle={submitPencilStyle} type="submit" />
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  lang_id: state.runtime.availableLocales[state.intl.locale || state.intl.defaultLocale].id
});

const mapDispatchToProps = {
};

export default withStyles(s)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ContactUs)));
