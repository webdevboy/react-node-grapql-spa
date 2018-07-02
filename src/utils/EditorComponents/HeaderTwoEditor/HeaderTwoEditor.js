import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class HeaderTwoEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<h2>
				<TextEditor listComponents={listComponents}/>
			</h2>
		);
	}
}

export default HeaderTwoEditor;
