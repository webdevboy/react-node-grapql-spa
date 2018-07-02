import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavBar.css';
import cx from 'classnames'; 
import _ from 'lodash';
import NavItem from './NavItem';



const NavList = function({ items, currentPath }) {
	
	return (
		<ul className={cx(s.nav, s['nav-tabs'], 'nav', 'nav-tabs')}>
	        { 
	        	items.map((item, index) => <NavItem key={index} {...item} currentPath={currentPath}/>) 
	        }
	    </ul>
	)
}

export default withStyles(s)(NavList);


