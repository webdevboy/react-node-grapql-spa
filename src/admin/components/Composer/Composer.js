import React from 'react';
import { getModule } from '../../../components/index';

class Composer extends React.Component {

	renderChild = (childId, body) => {
    return <Composer key={childId} id={childId} body={body} />
  }

  render() {

  	const { body, id } = this.props;
  	const { component, childIds } = body[id];
    
    if (component) {
    	const module = getModule[component.name];
    	return React.createElement(module.default, {...component.props, key: id, body: body }, childIds.map(childId => this.renderChild(childId, body))); 
    }

    return <div>{childIds.map(childId => this.renderChild(childId, body))}</div>

  }
}

export default Composer;