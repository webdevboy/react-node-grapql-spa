import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { injectIntl, intlShape } from "react-intl";
import { connect } from "react-redux";
import ADD_SUBSCRIBER from "themes/lunajets/mutations/addSubscriber.graphql";
import Input from "../../Primitives/Input";
import Text from "../../Primitives/Text";
import LoadingSpinner from "../../Widgets/LoadingSpinner";
import s from "./Subscriptor.css";
import TextPencilEditor from "../../i18n/TextPencilEditor";

class Subscriptor extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subscribed: false,
    };
    this.emailInputRef = React.createRef();
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  onAddSubscriberSuccess = (data) => {
    console.log(data);
    this.setState({
      subscribed: true,
    });
  };

  isEmailValid = () => this.emailInputRef.current && this.emailInputRef.current.validity.valid;

  render() {
    const { intl } = this.props;
    const placeholder = intl.formatHTMLMessage({
      defaultMessage: "Email Address",
      id: "client.newsletter.suscribe.input.placeholder",
    });
    return (
      <div className={s["row"]}>
        <div className={s["column"]}>
          <div className={s["container"]}>
            <div className={cx(s["title"], "conduit")}>
              {this.state.subscribed ? (
                <Text
                  defaultMessage="THANK YOU FOR SUBSCRIBING TO OUR NEWSLETTER"
                  id="client.newsletter.suscribe.thankYou"
                />
              ) : (
                <Text defaultMessage="SUBSCRIBE TO OUR NEWSLETTER" id="client.newsletter.suscribe.title" />
              )}
              
            </div>
            <div className={s["sub-title"]}>
              <Text defaultMessage="We promise that we won't spam you!" id="client.newsletter.suscribe.subtitle" />
            </div>
            
            { this.state.subscribed ?
              <div className="info">
                <Text defaultMessage="Please check your email inbox to confirm your subscription" id="client.newsletter.suscribe.confirmation-label" />
              </div>
              : null
            }
            {!this.state.subscribed && (
              <Mutation mutation={ADD_SUBSCRIBER} onCompleted={this.onAddSubscriberSuccess}>
                {(addSubscriber, { loading, error }) => {
                  this.addSubscriber = addSubscriber;
                  if (loading) return <LoadingSpinner />;

                  console.log(error);

                  return (
                    <div className={s["form-wrapper"]}>
                      <Input
                        ref={this.emailInputRef}
                        required
                        type="email"
                        placeholder={placeholder}
                        value={this.state.email}
                        name="email"
                        onChange={this.handleChange}
                        className={cx(s["subscription-input"])}
                        placeholderId="client.newsletter.suscribe.input.placeholder"
                        elementId="mail_nl_contact"
                      />
                      <React.Fragment>
                        <input
                          className={cx(s["subscription-btn"], "conduit")}
                          onClick={() => {
                            if (this.isEmailValid()) {
                              addSubscriber({
                                variables: {
                                  email: this.state.email,
                                },
                              });
                            }
                          }}
                          value="Subscribe"
                          type="submit"
                          name="nl_subs_form"
                        />
                        <TextPencilEditor messageId="client.newsletter.suscribe.button" defaultMessage="Subscribe" pencilStyle={{position: 'relative', right: '36px'}} />
                      </React.Fragment>
                      { error && error.length && error.map(err => <div className={s.error}>{err.message}</div>) }
                    </div>
                  );
                }}
              </Mutation>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale,
});

export default injectIntl(connect(mapStateToProps)(withStyles(s)(Subscriptor)));
