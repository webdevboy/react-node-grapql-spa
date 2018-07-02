import React, { Component } from 'react';
import cx from 'classnames'; 
import s from './Column.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Column extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { children, style, className } = this.props;
		return (
			<div className={cx(className)} style={style}>
				{ children }
			</div>
		);
		
	}
}

Column.propTypes = {
	children: PropTypes.node,
	style: PropTypes.object,
	className: PropTypes.string
}

Column.defaultProps = {
	style: {
		display: 'flex',
		height: '100px',
		width: '100%',
	}
}

export default withStyles(s)(Column)