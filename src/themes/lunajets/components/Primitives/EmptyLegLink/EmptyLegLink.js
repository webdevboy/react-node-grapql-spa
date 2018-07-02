import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';
import { connect } from 'react-redux';
import slugify from 'slugify';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class EmptyLegLink extends React.Component {
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
      emptyLegId,
      cityFrom,
      cityTo,
      messages,
      ...props
    } = this.props;
    const slugELF = (messages[locale] && messages[locale]["url.emptyLegFlights"]) ?
      messages[locale]["url.emptyLegFlights"] : "empty-leg-flights";
    const slugEL = (messages[locale] && messages[locale]["url.emptyLegFlights.emptyLeg"]) ?
      messages[locale]["url.emptyLegFlights.emptyLeg"] : "empty-leg";
    const columnName = `name_${locale}`;
    const nameFrom = slugify((cityFrom[columnName] ? cityFrom[columnName] : cityFrom["name"]), { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
    const nameTo = slugify((cityTo[columnName] ? cityTo[columnName] : cityTo["name"]), { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
    const pathUrl ="/".concat(locale,"/",slugELF,"/",slugEL,"-",nameFrom,"-",nameTo,"-",emptyLegId);
    return (
      <a href={`${pathUrl}`} {...props} onClick={e => this.handleClick(e,pathUrl)} >
        {children}        
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  messages: state.intl.messages
});

export default connect(mapStateToProps)(EmptyLegLink);
