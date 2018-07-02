import React from 'react';
import PropTypes from 'prop-types';
import TechnicalIssuePage from './500';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
                this.state = { hasError: false };
	}

        componentDidCatch(error, info) {
          this.setState({ hasError: true }); 
          console.log(error);
          console.log(info); 

        }

	render() {
                if (this.state.hasError) {
                  return <TechnicalIssuePage />;
                }
                return this.props.children;
	}
}

export default ErrorBoundary;
