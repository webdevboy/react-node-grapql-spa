import React from 'react';
import PropTypes from 'prop-types';
import TextBasic from '../TextBasic';
import { generateKey } from '../../DraftjsDecoder/generateKey'

class TextEditor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { listComponents } = this.props;
		return (
			<>
				{listComponents.map((item) => {
					return (
						<TextBasic key={generateKey()} item={item} />
					);
				})}
			</>
		);
	}
}

export default TextEditor;
