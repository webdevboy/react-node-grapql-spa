import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class HeaderOneEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<h1>
				<TextEditor listComponents={listComponents}/>
			</h1>
		);
	}
}

export default HeaderOneEditor;
