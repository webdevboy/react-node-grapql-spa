import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class HeaderFourEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<h4>
				<TextEditor listComponents={listComponents}/>
			</h4>
		);
	}
}

export default HeaderFourEditor;
