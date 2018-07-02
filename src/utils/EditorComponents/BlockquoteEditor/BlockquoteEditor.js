import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class BlockquoteEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<blockquote>
			    <TextEditor listComponents={listComponents}/>
			</blockquote>
		);
	}
}

export default BlockquoteEditor;
