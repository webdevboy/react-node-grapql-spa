import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from 'core/history';
import s from "./OfficeList.scss";
import GET_COUNTRY from '../../../../queries/getCountryById.gql';
import GET_CITY from '../../../../queries/getCityById.gql';
import Text from "../../../Primitives/Text";

class OfficeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxNum: 6,
      isMobile: false
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth > 768) {
      this.setState({
        maxNum: 100
      });
    } else {
      this.setState({
        isMobile: true
      });
    }
  }

  loadMore(e) {
    e.preventDefault();

    this.setState({
      maxNum: this.state.maxNum + 6
    });
  }

  render() {
    const { offices } = this.props;
    return (
      <div className={s.root}>
        <h2 className="uppercase corporate-blue" id="client.officelist.title" >{`${offices.length} offices around the world`}</h2>
        <div className="row">
        {
          offices.map((o, index) => index < this.state.maxNum ?
            <div className="col-12 col-sm-6 my-3">
              <h3 className="dk-red">{o.title}</h3>
              
              { (typeof o.meta.address === 'object')
                ? o.meta.address.map(add => (<><span className="dk-blue">{add}</span><br /></>))
                : <><span className="dk-blue">{o.meta.address}</span><br /></>
              }
              
              <span className="dk-blue">{o.meta.postal_code}</span><br/>
              <Query query={GET_CITY} variables={{ sf_id: o.meta.city_sfid }}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return `Error!: ${error}`;
        
                  return <span className="dk-blue">{data.city[0] ? data.city[0].name + ', ' : ''}</span>
                }}
              </Query>
              <Query query={GET_COUNTRY} variables={{ sf_id: o.meta.country_sfid }}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return `Error!: ${error}`;
        
                  return <span className="dk-blue">{data.country[0] ? data.country[0].name : ''}</span>
                }}
              </Query>
              {
                o.meta.phone ? 
                <span className="lt-red"><i className="fa fa-phone lt-red mr-2"/>{o.meta.phone}</span> : null
              }
              <br />
              {
                o.meta.alt_phone ? 
                <span className="lt-red"><i className="fa fa-phone lt-red mr-2"/>{o.meta.alt_phone}</span> : null
              }
              <br />
              {
                o.meta.alt_phone ? 
                <span className="lt-red"><i className="fa fa-fax lt-red mr-2"/>{o.meta.fax}</span> : null
              }
            </div> : null
          )
        }
        </div>
        {
          this.state.isMobile && this.state.maxNum < offices.length ? 
          <div className="row">
            <div className="col-12">
              <a href="#" className={cx ("btn btn-outline-primary conduit")} onClick={this.loadMore}>
                <Text defaultMessage="LOAD MORE" id="client.contactus.offices.viewMore" />
              </a>
            </div>
          </div> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(OfficeList)
);
