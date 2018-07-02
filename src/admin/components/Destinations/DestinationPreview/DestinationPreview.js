import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import s from './DestinationPreview.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-responsive-modal';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Destination from '../../../../components/Content/Destination/Destination'
import { IntlProvider } from 'react-intl';

class DestinationPreview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			previewOpened: false,
			article: null
		}
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	openPreview = (article) => {
		this.setState({
			previewOpened: true,
			article: article
		});
	}

	closePreview = () => {
		this.setState({
			previewOpened: false
		})
	}

	render() {
		const { previewOpened, article } = this.state;
		return (
		<IntlProvider locale={'en'} messages={[]}>
			<Modal open={previewOpened}
				onClose={this.closePreview}
				classNames={{
					modal: 'custom-modal',
					transitionEnter: 'transition-enter',
					transitionEnterActive: 'transition-enter-active',
					transitionExit: 'transition-exit-active',
					transitionExitActive: 'transition-exit-active',
				}}>
				<div className={s['banner-wrap']}>
				{/* TODO: Add Description Banner once this code is born*/}
				</div>
				<Destination data={{ article }} />
			</Modal>
		</IntlProvider>
		);
	}
}

export default (withStyles(s,bootstrap)(DestinationPreview));
