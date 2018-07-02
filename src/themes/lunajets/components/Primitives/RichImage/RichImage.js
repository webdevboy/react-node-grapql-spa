import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';
import { connect } from 'react-redux';
import TextPencilEditor from "../../i18n/TextPencilEditor";
import Image from "../Image";

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class RichImage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event,retrievedLink, targetBlank) => {
    if (!targetBlank){
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
  }

  render() {    
    const {      
      children,
      locale,
      id,
      links,
      text,
      to,
      targetBlank,
      src,
      ...props
    } = this.props;
    let retrievedText = text;
    let retrievedLink = to;
    const _links = links[locale];
    if (id && _links && _links[id]) {
      retrievedText = _links[id].text || retrievedText;
      retrievedLink = _links[id].url || retrievedLink;
    } 
    return (
      <a target={targetBlank ? "_blank" : ""}
        href={`${retrievedLink}`} {...props} 
        onClick={e => this.handleClick(e,retrievedLink, targetBlank)} >
      {retrievedText ?
            <span>
              <Image {...this.props} source={src} alt={retrievedText} title={retrievedText} />
                {id && 
                  <TextPencilEditor
                    messageId={id}
                    defaultMessage={retrievedText}
                    url={retrievedLink}
                    isLink = "true"
                  />}
            </span>
         : 
          children
        }        
      </a>
    );
  }
}

RichImage.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
};

RichImage.defaultProps = {
  to: "/",
};

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  links: state.intl.links
});

export default connect(mapStateToProps)(RichImage);
