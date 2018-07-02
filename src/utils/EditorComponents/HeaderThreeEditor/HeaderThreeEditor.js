import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class HeaderThreeEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<h3>
				<TextEditor listComponents={listComponents}/>
			</h3>
		);
	}
}

export default HeaderThreeEditor;
