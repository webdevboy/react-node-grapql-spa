import React from "react";
import { connect } from "react-redux";
import TextPencilEditor from "../../i18n/TextPencilEditor";

class TextArea extends React.Component {
  render() {
    const { placeholderId, placeholder, locale, messages, pencilStyle, elementId, ...props } = this.props;
    let placeHolderText = placeholder || "";
    if (placeholderId) {
      placeHolderText = (messages[locale] && messages[locale][placeholderId]) || placeholder || placeholderId;
    }

    return (
      <React.Fragment>
        <textarea ref={this.props.forwardedRef} placeholder={placeHolderText} id={elementId} {...props} />
        {this.props.placeholderId && (
          <TextPencilEditor messageId={this.props.placeholderId} defaultMessage={placeHolderText} pencilStyle={pencilStyle || {}} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale,
  messages: state.intl.messages,
});

const TextAreaWithRedux = connect(mapStateToProps)(TextArea);

export default React.forwardRef((props, ref) => <TextAreaWithRedux {...props} forwardedRef={ref} />);
