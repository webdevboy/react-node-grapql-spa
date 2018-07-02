import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectIntl, intlShape } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import Text from '../../Primitives/Text';
import s from './JoinTeam.scss';

class JoinTeam extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {      
      suscribed: false
    }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  addSubscriber = (ev) => {
    const { addSubscriber } = this.props;    
    this.setState({ subscribed: true })
  }

	render(){
	  const { classnames, intl } = this.props;
	  const { suscribed } = this.state;	  
	  return (
      <div className={cx(s['container'])}>
        <div className={cx("row")}>
          <div className={cx("col-md-12 text-center")}>					
						<div className={cx(s['title'])}>
              <h2>WOULD YOU LIKE TO JOIN OUR TEAM?</h2>							
						</div>
          </div>
        </div>
        <div className={cx("row","mt-4")}>
          <div className={cx("col-md-12 text-center")}>
            <a id="join_our_team" className={cx(s['open-btn'], "p-2")} onClick={this.addSubscriber}>              
              <Text defaultMessage="See the current Openings" id="client.opening.suscribe.button" />
						</a>            
          </div>
        </div>					
	    </div>);
    }
}

const mapStateToProps = (state, ownProps) => ({
  locale: state.intl.locale
});

const mapDispatchToProps = {
  // addSubscriber,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(JoinTeam)));
