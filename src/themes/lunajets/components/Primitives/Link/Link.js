import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';
import { connect } from 'react-redux';
import TextPencilEditor from "../../i18n/TextPencilEditor";

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event,retrievedLink) => {
    const { locale } = this.props;
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    if (event.defaultPrevented === true) {
      return;
    }
    event.preventDefault();    
    history.push(retrievedLink);
  }

  render() {    
    const {      
      children,
      locale,
      id,
      links,
      text,
      to,
      fixedLink = false,
      elementId,
      ...props
    } = this.props;
    let retrievedText = text;
    let retrievedLink = to;
    const _links = links[locale];
    if (id && _links && _links[id]) {
      retrievedText = _links[id].text || retrievedText;
      retrievedLink = fixedLink ? retrievedLink : _links[id].url || retrievedLink;
    }
    // console.log('====> ', `${locale}${retrievedLink}`)
    return (
      <a
        href={`${retrievedLink}`} {...props}
        onClick={e => this.handleClick(e,retrievedLink)}
        id={elementId} >
        { retrievedText ? 
            <span>
              {retrievedText}
              {id && 
                <TextPencilEditor
                  messageId={id}
                  defaultMessage={retrievedText}
                  url={retrievedLink}
                  isLink ={ fixedLink ? false : true }
                />}
            </span>
         : 
          children
        }        
      </a>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
};

Link.defaultProps = {
  to: "/",
};

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  links: state.intl.links
});

export default connect(mapStateToProps)(Link);
