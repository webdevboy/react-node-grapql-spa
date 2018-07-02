import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';
import { generateKey } from '../../DraftjsDecoder/generateKey'

class UnorderedListEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listLi } = this.props;
		return (
			<ul>
				{listLi.map(aLi => {return <li key={generateKey()}><TextEditor listComponents={aLi}/></li>})}
			</ul>
		);
	}
}

export default UnorderedListEditor;
