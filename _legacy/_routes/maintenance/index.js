import React from 'react';
import Page from '../../components/Page';
import Maintenance from './Maintenance';

function action() {
    return {
	    title: 'We\'re in maintenance',
	    component: <Maintenance />,
	    status: 503,
	    description: 'we\'re working on it!',
    };
};

export default action;
