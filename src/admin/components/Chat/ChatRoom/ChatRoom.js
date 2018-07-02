import React from "react";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ChatRoom.css";
import cx from "classnames";
import ChatMessage from "./ChatMessage";
import Link from "react-feather/dist/icons/link";
import Link2 from "react-feather/dist/icons/link-2";
import Paperclip from "react-feather/dist/icons/paperclip";
import FilePlus from "react-feather/dist/icons/file-plus";
import gql from "graphql-tag";
import _ from "lodash";
import { addMessage } from 'admin/actions/chat';
import { connect } from "react-redux";
import sendMessage from "./sendMessage.graphql";
import subscribeNewMessage from "./subscribeNewMessage.graphql";
import Breadcrumbs from "../../Breadcrumbs";

const messages = defineMessages({
  send: {
    id: "actions.send",
    defaultMessage: "Send",
    description: "actions.send",
  },
  textareaPlaceholder: {
    id: "textarea.placeholder",
    defaultMessage: "Write your message",
    description: "placeholder for textarea chat room",
  },
  dropdownTitle: {
    id: "dropdown.title",
    defaultMessage: "Add to Conversation",
    description: "dropdown title Add to Conversation",
  },
  dropdownFile: {
    id: "dropdown.uploadfile",
    defaultMessage: "File",
    description: "dropdown send file",
  },
  dropdownDocuSign: {
    id: "dropdown.docusign",
    defaultMessage: "Link DocuSign",
    description: "dropdown docusign",
  },
  dropdownLink: {
    id: "dropdown.link",
    defaultMessage: "Link URL",
    description: "dropdown link url",
  },
  loadMore: {
    id: "chat.room.load.more",
    defaultMessage: "Load More",
    description: "Button on top of chat room to fetch more messages",
  },
});

const quickActions = [
  {
    to: "#file",
    label: messages.dropdownFile,
    icon: <FilePlus color="#FFFFFF" />,
  },
  {
    to: "#docusign",
    label: messages.dropdownDocuSign,
    icon: <Link color="#FFFFFF" />,
  },
  {
    to: "#link-url",
    label: messages.dropdownLink,
    icon: <Link2 color="#FFFFFF" />,
  },
];

// const getTextAreaPlaceholder = () => intl. {...messages.placeholder} />

class ChatRoom extends React.Component {
  static contextTypes = {
    client: PropTypes.object.isRequired,
    // store: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentChunk: 1,
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.maxConversationLength = 20;
    this.loadMore = this.loadMore.bind(this);
  }

  handleMessageChange(e) {
    this.setState({
      message: this.message.value,
    });

    const heightLimit = 200;

    this.message.style.height = ""; /* Reset the height */
    this.message.style.height = `${Math.min(this.message.scrollHeight, heightLimit)}px`;
  }

  loadMore() {
    this.setState({ currentChunk: this.state.currentChunk + 1 });
  }

  componentDidMount() {
    this.scrollToLastMessage();
    this.subscribe();
  }

  scrollToLastMessage(delay) {
    delay = delay || 300;
    $(this.messageContainer).animate({ scrollTop: `${this.messageContainer.scrollHeight}px` }, delay);
  }

  subscribe() {
    const { client } = this.context;
    const { addMessage, id } = this.props;

    this.subscriptionObserver = client.subscribe({
      query: subscribeNewMessage,
      variables: {
        roomId: id,
      },
    }).subscribe({
      next(data) {
        console.log(data);

        addMessage({
          roomId: id,
          message: data.newMessage,
        });
      },
      error(err) { console.error("err", err); },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conversation.length > prevProps.conversation.length) {
      this.scrollToLastMessage();
    }
  }

  sendMessage = (e) => {
    e.preventDefault();

    if (this.state.message.length) {
      this.context.client.mutate({
        mutation: sendMessage,
        variables: {
          roomId: this.props.id,
          body: this.state.message,
        },
      }).then(({ data }) => {
        console.log(data, "!!success");
        this.setState({ message: "" });
      });
    }
  }


  render() {
    const { intl, conversation } = this.props;
    const textAreaPlaceholder = intl.formatMessage(messages.textareaPlaceholder);

    const visibleMessages = _.sortBy(conversation, [function (msg) { return _.now(msg.created_at); }]).reverse();
    // const messageChunks = _.chunk(sortedByDate, this.maxConversationLength);
    // const visibleMessages = _.sortBy(_.flatten(messageChunks.slice(0, this.state.currentChunk)), [function(msg) { return _.now(msg.created_at) }]).reverse();

    return (
      <div className={s.container}>

        <Breadcrumbs route={this.props.currentRoute} />
        <div className={s.messages} ref={el => this.messageContainer = el}>

          { /* (messageChunks.length > 1 && messageChunks.length > this.state.currentChunk ) ? <button className={cx('btn', 'btn-white', 'btn-block')} onClick={this.loadMore}><FormattedMessage {...messages.loadMore}/></button> : '' */ }
          { visibleMessages.map(msg => <ChatMessage key={msg.id} message={msg} owner={msg.user ? "user" : "customer"} />) }

        </div>
        <form className={s["chat-inputs"]} onSubmit={this.sendMessage}>

          <div className={s.elastic}>
            <textarea autoFocus className={cx("form-control", s["message-field"])} onChange={this.handleMessageChange} value={this.state.message} ref={input => this.message = input} placeholder={textAreaPlaceholder} />
          </div>

          <div className={s.actionGroup}>
            <div className={cx(s.actions, "dropup")}>

              <a className={cx("dropdown-toggle", "no-caret")} id="room-actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Paperclip size="18" color="#FFFFFF" />
              </a>

              <ul className={cx("dropdown-menu", "dropdown-menu-right")} aria-labelledby="room-actions">

                <li className={"dropdown-header"}><FormattedMessage {...messages.dropdownTitle} /></li>
                { quickActions.map((item, index) => <li className={"dropdown-item"} key={index}><a href={item.to}>{item.icon}<FormattedMessage {...item.label} /></a></li>) }
              </ul>
            </div>

            <button type="submit" className={cx("btn", (this.state.message.length) ? "btn-secondary" : "btn-primary")}>
              <FormattedMessage {...messages.send} />
            </button>

          </div>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { messages } = _.find(state.chat.rooms, { id: props.id });
  return {
    conversation: messages,
  };
};

export default connect(mapStateToProps, { addMessage })(injectIntl(withStyles(s)(ChatRoom)));

