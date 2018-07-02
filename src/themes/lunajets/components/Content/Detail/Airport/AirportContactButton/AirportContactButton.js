import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MdPhoneInTalk from "react-icons/lib/md/phone-in-talk";
import TiMail from "react-icons/lib/ti/mail";

import Text from "../../../../Primitives/Text";
import Input from "../../../../Primitives/Input";
import s from "./AirportContactButton.scss";


class AirportContactButton extends React.Component {

  chooseIcon(icon) {
    switch(icon) {
      case 'phone':
        return <MdPhoneInTalk size="30" />;
        break;
      case 'mail':
        return <TiMail size="36" onClick={this.openMail} />;
        break;
      default:
        return <MdPhoneInTalk size="30" />;
    }
  }

  render() {
    const posts = this.props.settings;
    const formName = posts.icon == 'phone' ? 'lets_talk_form' : 'email_us_form';

    return (
      <div className={cx(s["contact-button-area"])}>
        <form name={formName} action={posts.href}>
          <div className={cx("btn", s["contact-button"], s[`${posts.icon}`])}>
            <Input
              type="submit"
              placeholder={posts.Text}              
              className={cx("uppercase", )}
              placeholderId={posts.id}
              style={{background: "transparent", border: "none", color: "white", outline: "none", cursor: "inherit"}}
              pencilStyle={{ position: "relative", padding: "5px", color: "white" }}              
              />
            {
              this.chooseIcon(posts.icon)  
            }
          </div>          
        </form>        
      </div>
    );
  }
}

export default withStyles(s)(AirportContactButton);
