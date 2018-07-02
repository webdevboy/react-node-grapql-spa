import React from 'react';
import PropTypes from 'prop-types';
import { generateKey } from '../../DraftjsDecoder/generateKey'

class TextBasic extends React.Component {

	constructor(props) {
		super(props);
	}

	construcTypeOfItem = (item) => {
		const cssStyle = {};
		if (item.isBold){
			cssStyle['font-weight'] = 'bold';
		}
		if(item.isItalic){
			cssStyle['font-style'] = 'italic';
		}
		return cssStyle;
	};
	render() {
		const { item } = this.props;
		
		return (
			<span style={this.construcTypeOfItem(item)} >
				{ (item.isLink) ? <a href={item.url}>{item.text}</a> : item.text }
			</span>
		);
	}
}

export default TextBasic;
