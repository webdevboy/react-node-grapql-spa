import React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import s from './EventPreview.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-responsive-modal';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import EventBanner from 'themes/lunajets/components/Content/Detail/Event/EventBanner';
import EventDescription from 'themes/lunajets/components/Content/Detail/Event/EventDescription';
import EventRecommended from 'themes/lunajets/components/Content/Detail/Event/EventRecommended';
import EventHelicopter from 'themes/lunajets/components/Content/Detail/Event/EventHelicopter';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import it from 'react-intl/locale-data/it';

import localeData from './en.json';

addLocaleData([...en, ...es, ...fr, ...it]);

class EventPreview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			previewOpened: false,
			event: null,
			locale : 'en',
			messages : [],
		}
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	openPreview = (event,locale,messages) => {
		this.setState({
			previewOpened: true,
			event: event,
			locale: locale,
			messages: messages,
		});
	}

	closePreview = () => {
		this.setState({
			previewOpened: false
		})
	}

	render() {
		const { previewOpened, event, messages , locale } = this.state;
		console.log("DADA");
		console.log(locale);
		console.log(messages);
		return (
		<IntlProvider locale = {locale} messages={messages}>
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
				<EventBanner data={{ event }} />
				</div>
				<EventDescription data={{ event }} />		
				<EventRecommended data={{ event }} />
				<EventHelicopter />		
			</Modal>
		</IntlProvider>
		);		
	}
}

export default (withStyles(s,bootstrap)(EventPreview));
