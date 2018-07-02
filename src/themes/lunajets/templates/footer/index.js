import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FooterLinks from '../../components/Footer/FooterLinks'
import FooterEnd from '../../components/Footer/FooterEnd'

class Footer extends Component {

  static propTypes = {
    footer_links: PropTypes.any,
    footer_end: PropTypes.any,
    before_footer: PropTypes.any,
    children: PropTypes.any,
    after_footer: PropTypes.any,
    post: PropTypes.any
  }

  static defaultProps = {
    footer_links: true,
    footer_end: true,
    before_footer: null,
    children: [
      <FooterLinks />,
      <FooterEnd />
    ],
    after_footer: null,
    post: null
  }

  render() {
    const {
      footer_links,
      footer_end,
      before_footer,
      after_footer,
      post,
    } = this.props;

    const children = [
      (footer_links !== false) ? <FooterLinks {...footer_links} post={post} /> : null,
      (footer_end !== false) ? <FooterEnd {...footer_end} /> : null,
    ];

    return (
      <footer className="footer">
        { before_footer }
        { children }
        { after_footer }
      </footer>
    )
  }
}

export default Footer;
