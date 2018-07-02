import React, { Component } from 'react';

const AvatarBadge = function(props) {
	return <a 
		className={cx(s.avatar, 'nav-link', 'dropdown-toggle')} 
		style={{backgroundImage: 'url(' + ((user.avatar_path) ? user.avatar_path : avatar) + ') !important;' }} 
	></a>

}

export default AvatarBadge;