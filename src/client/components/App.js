import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "react-apollo";

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired, // Universal HTTP client
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  params: PropTypes.object,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
  client: PropTypes.object.isRequired, // Apollo Client
  intl: IntlProvider.childContextTypes.intl, // ReactIntl
  locale: PropTypes.string,
  theme: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    keywords: PropTypes.string,
  }),
  isMaintenance: PropTypes.bool.isRequired,
  homePage: PropTypes.string.isRequired,
  hreflangs: PropTypes.array,
  hostname: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    const { client } = this.props.context;

    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

export default App;
