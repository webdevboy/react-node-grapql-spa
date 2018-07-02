import React from "react";
import { connect } from "react-redux";
import TextPencilEditor from "../../i18n/TextPencilEditor";

class Input extends React.Component {
  render() {
    const { placeholderId, placeholder, locale, messages, pencilStyle, elementId, value, type, ...props } = this.props;
    let placeHolderText = placeholder || "";
    if (placeholderId) {
      placeHolderText = (messages[locale] && messages[locale][placeholderId]) || placeholder || value || placeholderId;
    }

    return (      
      <React.Fragment>
        {
          type == "submit" ? (
            <input ref={this.props.forwardedRef} value={placeHolderText} id={elementId} type="submit" {...props} />
          ):
          (
            <input ref={this.props.forwardedRef} placeholder={placeHolderText} id={elementId} {...props} />
          )
        }        
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

const InputWithRedux = connect(mapStateToProps)(Input);

export default React.forwardRef((props, ref) => <InputWithRedux {...props} forwardedRef={ref} />);
