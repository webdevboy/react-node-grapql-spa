import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';
import { generateKey } from '../../DraftjsDecoder/generateKey'

class OrderedListEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listLi } = this.props;
		return (
			<ol>
				{listLi.map(aLi => {return <li key={generateKey()}><TextEditor listComponents={aLi}/></li>})}
			</ol>
		);
	}
}

export default OrderedListEditor;
