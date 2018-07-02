import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./ChatBox.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import ChevronRight from "react-feather/dist/icons/chevron-right";
import MessageCircle from "react-feather/dist/icons/message-circle";
import moment from "moment";

class ChatBox extends Component {
	static defaultProps = {
	}

	static propTypes = {
	}

	constructor(props) {
	  super(props);

	  this.state = {
	    newMessages: 0,
	    expanded: false,
	  };
	}

	componentDidMount() {
	  // add subscription here
	}

	toggleExpand = () => {
	  this.setState({
	    expanded: !this.state.expanded,
	  });
	}

	pulse = (e) => {
	  e.preventDefault();
	  e.stopPropagation();
	  $(e.target).addClass("pulse");
	}

	render() {
	  const advisorAvatar = null;

	  if (this.state.expanded) {
	    return (

  <div className={cx(s.root)}>

    <div className={cx(s.messages)}>

      <div className={cx(s.message, s.advisor)}>

        <div className={cx(s.advisorAvatar)} />

        <div className={cx(s.msg)}>

									Lorem ipsum dolor sit amet

          <span className={cx(s.timeago)}>
            {moment().fromNow()}
          </span>

        </div>

      </div>

      <div className={cx(s.message, s.me)}>

        <div className={cx(s.msg)}>

									Lorem ipsum dolor sit amet

          <span className={cx(s.timeago)}>
            {moment().fromNow()}
          </span>
        </div>

      </div>

    </div>

    <div className={cx(s.core)}>

      <div className={cx(s.typebox)}>
        <input placeholder="Type a message …" type="text" className={cx(s.chatinput)} />
        <button><ChevronRight color="#3E5970" /></button>
      </div>


      <div className={cx(s.toggle)} ref="toggler" onMouseOver={this.pulse} onClick={this.toggleExpand}>
        <span className={cx(s.badge)}>
          {this.state.newMessages}
        </span>
        <MessageCircle color="#FFFFFF" />
      </div>


    </div>

  </div>
	    );
	  }

	  return (
  <div className={cx(s.root)}>
    <div className={cx(s.core)}>
      <div className={cx(s.toggle)} ref="toggler" onMouseOver={this.pulse} onClick={this.toggleExpand}>
        <span className={cx(s.badge)}>
          {this.state.newMessages}
        </span>
        <MessageCircle color="#FFFFFF" />
      </div>
    </div>
  </div>
	  );
	}
}

export default withStyles(s)(ChatBox);

export const component = {
  defaultProps: ChatBox.defaultProps,
  propTypes: ChatBox.propTypes,
  category: "widget",
  tags: [
    "chat",
    "widget",
    "messaging",
  ],
};
