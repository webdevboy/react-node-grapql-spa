import React from 'react';
import cx from 'classnames'; 
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Row.css';
import PropTypes from 'prop-types';
import Column from '../Column';

class Row extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { children, className, style } = this.props;
		return (
			<div className={className} style={style}>
				{ children }
			</div>
		)
	}
}

Row.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
	style: PropTypes.object
}

Row.defaultProps = {
	children: null,
	style: {
		display: 'flex',
		height: '100px',
		width: '100%',
		backgroundColor: '#f9f9f9',
	}
}

export default withStyles(s)(Row)