import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';
import { connect } from 'react-redux';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class WrapperLink extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event,pathUrl) => {
    const { locale } = this.props;
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    if (event.defaultPrevented === true) {
      return;
    }
    event.preventDefault();    
    history.push(`${pathUrl}`);
  }

  render() {    
    const {      
      children,
      locale,
      pathUrl,
      ...props
    } = this.props;
    return (
      <a href={`${pathUrl}`} {...props} onClick={e => this.handleClick(e,pathUrl)} >
        {children}        
      </a>
    );
  }
}

WrapperLink.propTypes = {
  pathUrl: PropTypes.string.isRequired,
  children: PropTypes.node,
};

WrapperLink.defaultProps = {
  pathUrl: "/",
};

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  links: state.intl.links
});

export default connect(mapStateToProps)(WrapperLink);
