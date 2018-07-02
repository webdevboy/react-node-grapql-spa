import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';
import { connect } from 'react-redux';
import { goToStep, changeLocation, updateContact } from "themes/lunajets/actions/requestFlight"

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class CallToActionLink extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event,pathUrl) => {
    const { data, contact, goToStep, changeLocation, updateContact  } = this.props;
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    if (event.defaultPrevented === true) {
      return;
    }
    event.preventDefault();
    if (data){
      changeLocation(data);
    }
    if (contact){
      updateContact(contact);
    }
    goToStep({step:1});
  }

  render() {    
    const {      
      children,
      locale,
      elementId,
      ...props
    } = this.props;
    return (
      <a {...props} id={elementId} onClick={this.handleClick} >
        {children}        
      </a>
    );
  }
}

CallToActionLink.propTypes = {
  children: PropTypes.node,
};


const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  links: state.intl.links
});

export default connect(mapStateToProps, { goToStep, changeLocation, updateContact } )(CallToActionLink);
