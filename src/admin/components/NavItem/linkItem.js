import React from 'react';
import history from 'core/history';
import cx from 'classnames'; 
import s from 'admin/components/NavBar/NavBar.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class LinkItem extends React.Component {

	constructor(props) {
		super(props);
		console.log('HISTORY ====> ',history);
	}

	handleClick(e) {
	    e.preventDefault();
	    history.push(this.props.to);
	};

	render() {
		const { to, children } = this.props;
		return <a className={cx('nav-link', s.link)} href={to} onClick={this.handleClick.bind(this)}>{children}</a>
	}

}

export default withStyles(s)(LinkItem);