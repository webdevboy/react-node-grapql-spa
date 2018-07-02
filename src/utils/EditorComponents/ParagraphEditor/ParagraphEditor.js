import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class ParagraphEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<p>
			    <TextEditor listComponents={listComponents}/>
			</p>
		);
	}
}

export default ParagraphEditor;
