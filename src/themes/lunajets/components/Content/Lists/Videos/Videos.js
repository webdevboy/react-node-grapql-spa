import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import SectionTitle from "../../../Layout/SectionTitle";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Video from '../../../Primitives/Video';
import Text from "../../../Primitives/Text";
import history from 'core/history';
import s from "./Videos.css";
import video from './gfx/big_buck_bunny.mp4';

const QUERY = gql `query($id: ID!) { 
  article: getArticle(id: $id) { id, title, summary, body }
}`;

class Videos extends Component {

  componentDidMount() {
    //console.log(this.props);
  }

  render() {
    // const { data: { articles }, linkToDetail } = this.props;
    const vidoes = [
      {
        source: '',
        description: 'L\'aviation d\'affaires en crise? Alain Leboursier, Directeur du Developpment ch' +
            'ez LunaJets dans 3D Eco.',
        date: '12 MAY 2017'
      }, {
        source: '',
        description: 'L\'aviation d\'affaires en crise? Alain Leboursier, Directeur du Developpment ch' +
            'ez LunaJets dans 3D Eco.',
        date: '12 MAY 2017'
      }, {
        source: '',
        description: 'L\'aviation d\'affaires en crise? Alain Leboursier, Directeur du Developpment ch' +
            'ez LunaJets dans 3D Eco.',
        date: '12 MAY 2017'
      }, {
        source: '',
        description: 'L\'aviation d\'affaires en crise? Alain Leboursier, Directeur du Developpment ch' +
            'ez LunaJets dans 3D Eco.',
        date: '12 MAY 2017'
      }, {
        source: '',
        description: 'L\'aviation d\'affaires en crise? Alain Leboursier, Directeur du Developpment ch' +
            'ez LunaJets dans 3D Eco.',
        date: '12 MAY 2017'
      }, {
        source: '',
        description: 'L\'aviation d\'affaires en crise? Alain Leboursier, Directeur du Developpment ch' +
            'ez LunaJets dans 3D Eco.',
        date: '12 MAY 2017'
      }
    ];

    const youtubechannel = "Our Youtube Channel";
    const moreVideoButton = "DISCOVER MORE VIDEOS";

    return (
      <div className={s.root}>
        <div className="row mt-5 mb-5">
          <div className="col-lg-8">
            <SectionTitle textId="client.page.media.video.sectionTitle" defaultMessage="Videos" hx="2"/>
          </div>
          <div className="col-lg-4">
            <a target="_blank" className={cx(s.youtubechannel, "d-none d-lg-block btn lt-red w-100")} href='https://www.youtube.com/user/lunajets'>
              <Text id="client.page.media.video.youtubechannel" defaultMessage={youtubechannel}/>
              <i className="fa fa-youtube-play" aria-hidden="true"/>
            </a>
          </div>
        </div>
        <div className='row pb-3'>
          {vidoes.map((v, index) => <div className="col-lg-4 my-3">
            <Video border source={video}/>
            <div className={s.videoplaceholder}>
              <div className="row">
                <div className={cx(s.description, "col-lg-8")}>
                  <Text id={`videodescriptoin${index}`} defaultMessage={v.description}/>
                </div>
                <div className={cx(s.date, "col-lg-4")}>
                  <Text id={`videodate${index}`} defaultMessage={v.date}/>
                </div>
              </div>
            </div>
          </div>)}
        </div>
        <div className={cx(s.mobilemmt, "row")}>
          <div className="col-lg-8"/>
          <div className="col-lg-4">
            <a target="_blank" className={cx(s.youtubechannel, "btn d-none d-sm-block d-md-block dk-red-bg white w-100")} href='https://www.youtube.com/user/lunajets'>
              <Text id="client.page.media.video.youtubechannel" defaultMessage={youtubechannel}/>
              <i className="fa fa-youtube-play" aria-hidden="true"/>
            </a>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-lg-4"/>
          <div className="col-lg-4">
            <a className="btn btn-outline dk-blue w-100">
              <Text id="primarybutton" defaultMessage={moreVideoButton}/>
            </a>
          </div>
          <div className="col-lg-4"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default withStyles(s)(Videos);
