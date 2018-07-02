import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextPencilEditor from "../../i18n/TextPencilEditor";

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.defaultMessage || '',
    };
  }

  render() {
    const { text } = this.state;
    const { suffixMessage, id, elementId, defaultMessage, isHeader, h2, strong, className, locale, messages, editable, ...others } = this.props;
    let textContent = defaultMessage;
    if (messages[locale] && messages[locale][id]) {
      textContent = messages[locale][id];
    }
    var displayContext = textContent;
    if (suffixMessage) {
      displayContext = textContent + suffixMessage;
    }

    let textBlock = "";
    if (isHeader) {
      textBlock = "header";
    } else if (!isHeader && strong) {
      textBlock = "strong";
    } else if (!isHeader && !strong) {
      textBlock = "normal";
    }

    if (h2) {
      textBlock = "h2";
    }

    switch (textBlock) {
      case "header":
        return (
          <React.Fragment>
            <h1 {...others} className={className} id={elementId ? elementId : null}>
              {(displayContext === 'N/A') ? '' : displayContext}
              {
                editable && id && (
                  <TextPencilEditor
                    messageId={id}
                    defaultMessage={textContent}
                  />
                )
              }
            </h1>
          </React.Fragment>
        );
      case "h2":
        return (
          <React.Fragment>
            <h2 {...others} className={className} id={elementId ? elementId : null}>
              {(displayContext === 'N/A') ? '' : displayContext}
              {
                editable && id && (
                  <TextPencilEditor
                    messageId={id}
                    defaultMessage={textContent}
                  />
                )
              }
            </h2>
          </React.Fragment>
        );
      case "strong":
        return (
          <React.Fragment>
            <strong {...others} className={className} id={elementId ? elementId : null}>
              {(displayContext === 'N/A') ? '' : displayContext}
              {
                editable && id && (
                  <TextPencilEditor
                    messageId={id}
                    defaultMessage={textContent}
                  />
                )
              }
            </strong>
          </React.Fragment>
        );
      case "normal":
        return (
          <React.Fragment>
            <span {...others} className={className} id={elementId ? elementId : null}>
              {(displayContext === 'N/A') ? '' : displayContext}
              {
                editable && id && (
                  <TextPencilEditor
                    messageId={id}
                    defaultMessage={textContent}
                    pencilStyle={this.props.pencilStyle}
                  />
                )
              }
            </span>
          </React.Fragment>
        );
    }
  }
}

Text.propTypes = {
  id: PropTypes.string.isRequired,
  elementId: PropTypes.string,
  defaultMessage: PropTypes.string,
  isHeader: PropTypes.bool,
  strong: PropTypes.bool,
  editable: PropTypes.bool,
};

Text.defaultProps = {
  elementId: "",
  defaultMessage: "",
  isHeader: false,
  strong: false,
  editable: true
};

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  messages: state.intl.messages
});

export default connect(mapStateToProps)(Text);
