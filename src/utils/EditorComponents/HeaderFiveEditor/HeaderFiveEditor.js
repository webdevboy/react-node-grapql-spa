import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class HeaderFiveEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<h5>
				<TextEditor listComponents={listComponents}/>
			</h5>
		);
	}
}

export default HeaderFiveEditor;
