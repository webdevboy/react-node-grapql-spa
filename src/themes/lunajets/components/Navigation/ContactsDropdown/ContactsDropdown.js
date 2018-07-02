import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Query, graphql, compose } from 'react-apollo';
import cx from "classnames";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Phone from "react-feather/dist/icons/phone";
import s from "./ContactsDropdown.css";
import Link from "../../Primitives/Link";
import gql from 'graphql-tag';
import _ from 'lodash';

class ContactsDropdown extends Component {

  constructor(props) {
    super(props);

    const { data } = props; 
    const primary = _.find(data.offices, ({ meta }) => (meta.primary));

    this.state = {
      selected: primary,
    };

  }

  makeCall = (office) => {
    this.setState({ selected: office }, () => {
      window.location.href = `tel:${office.meta.phone}`;
    })
  }

  render() {
    const { selected } = this.state;
    const { data } = this.props;
    const offices = _.orderBy(data.offices.filter(({ id }) => (selected.id)), ['meta.order'], ['asc']);

    return (
      <li className={cx("nav-item dropdown", s.phone)}>
        <a
          className={cx("dropdown-toggle")}
          id="contacts-dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Phone size={16} />
          <span>{selected.meta.phone}</span>
        </a>
        <ul className={cx('dropdown-menu')} aria-labelledby="offices-dropdown">
          { offices.map((office) => (
            <li className="active">
              <a className="dropdown-item" style={{display: 'flex', justifyContent: 'space-between'}} href={`tel:${office.meta.phone}`} onClick={() => this.makeCall(office)}>
                <span className={cx("famfamfam-flags", office.meta.countryCode)} />
                <span>{office.meta.phone}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  }
}

const GET_OFFICES = gql`
{
  offices: getPosts(type: "office") {
    ... on PostInterface {
      __typename
      id
      meta
    }
  }
}`

export default compose(withStyles(s))(graphql(GET_OFFICES, {
  // ssr: true,
})(ContactsDropdown))

// <li className="nav-item dropdown">
//         <a className={cx('dropdown-toggle')} id="locales-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           <span>{availableLocales[currentLocale].native}</span>
//         </a>
//         <ul className={cx('dropdown-menu')} aria-labelledby="locales-dropdown">
//           { Object.keys(availableLocales).map(locale => {
//             if (locale === currentLocale) { return null }
//             return (
//               <ListLocales
//                 key={`lang-${locale}`} 
//                 setLocale={this.setLocale}
//                 language={availableLocales[locale].native}
//                 locale={locale}
// 				        active={this.hreflang(locale)}
//               />
//             );
//           })}
//         </ul>
//       </li>
