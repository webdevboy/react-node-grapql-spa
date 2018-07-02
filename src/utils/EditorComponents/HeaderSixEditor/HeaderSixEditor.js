import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class HeaderSixEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<h6>
				<TextEditor listComponents={listComponents}/>
			</h6>
		);
	}
}

export default HeaderSixEditor;
