/* eslint-disable no-shadow */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import _ from "lodash";
import { setLocale } from "shared/actions/intl";
import s from "./LanguageSwitcher.css";
import history from "core/history";

const ListLocales = ({ locale, language, setLocale, active }) => {
  return (
    <li className={active ? cx("active") : cx("disabled")}>
      {active ? (
        <a
          className={cx("dropdown-item")}
          href={`#${locale}`}
          onClick={e => setLocale(e, { locale, path: active.path })}
        >
          <span className={s.text}>{language.toUpperCase()}</span>
        </a>
      ) : (
        <div className={cx("dropdown-item")}>
          <span className={s.text}>{language.toUpperCase()}</span>
        </div>
      )}
    </li>
  );
};

class LanguageSwitcher extends Component {
  static contextTypes = {
    hreflangs: PropTypes.object,
  };

  setLocale = (e, { locale, path }) => {
    e.preventDefault();
    this.props.setLocale({ locale });
    if (path) history.push(path);
  };

  hreflang = loc => _.find(this.context.hreflangs, ({ locale }) => locale === loc) || null;

  render() {
    const { currentLocale, availableLocales, id } = this.props;

    return (
      <li className="nav-item dropdown">
        <a
          className={cx("dropdown-toggle", s["select-wrapper"])}
          id="locales-dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className={s.text}>{availableLocales[currentLocale].native}</span>
        </a>
        <ul className={cx("dropdown-menu")} aria-labelledby="locales-dropdown">
          {Object.keys(availableLocales).map(locale => {
            if (locale === currentLocale) {
              return null;
            }
            return (
              <ListLocales
                key={`lang-${locale}`}
                setLocale={this.setLocale}
                language={availableLocales[locale].native}
                locale={locale}
                active={this.hreflang(locale)}
              />
            );
          })}
        </ul>
      </li>
    );
  }
}

const mapState = state => ({
  availableLocales: state.runtime.availableLocales || [],
  currentLocale: state.intl.locale || state.intl.defaultLocale,
});

const mapDispatch = {
  setLocale,
};
export default connect(mapState, mapDispatch)(withStyles(s)(LanguageSwitcher));
