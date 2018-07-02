import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Column from '../Column';
import Row from '../Row';
import Text from '../../Primitives/Text';
import PropTypes from 'prop-types';



const RightButton = ({background, color, icon, label, id}) => {
  const style = {
    background: background,
    color: color,
  }

  return <a className={'btn btn-outline btn-header dk-red big'}><Text defaultMessage={label.defaultMessage} id={label.id}/>{icon ? icon : null}</a>
}

const V1 = ({id, heading}) => {
    return (<div className={'heading-break'}>
        <span className={`section-title ${(heading.title.color) ? heading.title.color : 'white'}`}><Text defaultMessage={heading.title.defaultMessage} id={heading.title.id}/></span>
        <h1 className={`section-heading ${heading.subtitle.color}`}><Text defaultMessage={heading.subtitle.defaultMessage} id={heading.subtitle.id}/></h1>
      </div>)
  }

  const V2 = ({id, title}) => {
    return (<div>
        <h1 className={'section-heading'}><Text defaultMessage={title.defaultMessage} id={title.id}/></h1>
      </div>)
  }

  const V3 = ({id, subtitle}) => {
    return (<div>
        <span className={`section-title ${(subtitle.color) ? subtitle.color : 'white'}`}><Text defaultMessage={subtitle.defaultMessage} id={subtitle.id}/></span>
      </div>)
  }

  const V4 = ({id, heading}) => {
    return (<div style={{padding: '40px 0'}}>
        <V1 heading={heading} id={id} />
        <p className={'section-heading-paragraph'}> <Text defaultMessage={heading.paragraph.defaultMessage} id={heading.paragraph.id}/></p>
      </div>)
  }

const V5 = ({id, heading, rightButton}) => {
  return (<div className={'section-heading-container'}>
      <V1 heading={heading} id={id} />
      <RightButton {...rightButton} id={id}/>
    </div>)
}

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    heading: PropTypes.shape({
      title: PropTypes.object,
      subtitle: PropTypes.object,
      paragraph: PropTypes.object,
    }),
  };

  

  render() {
    const { params, version, heading, backgroundColor, rightButton, editorID } = this.props;

    const column = {
      maxWidth: '1140px',
      padding: '0px 15px',
    };

    return ( 
      // <Row style={{justifyContent: 'center', backgroundColor: `${backgroundColor}`}} data-type={this.props['data-type']} data-key={editorID}>
      //   <Column style={column}>
      //     <Row inner={true}>
      //       { (version === 1) ? <V1  heading={heading} /> : null }

      //       { (version === 2) ? <V2  title={heading.title} /> : null }

      //       { (version === 3) ? <V3  subtitle={heading.subtitle} /> : null }
           
      //       { (version === 4) ? <V4  heading={heading} /> : null }

      //       { (version === 5) ? <V5  heading={heading} rightButton={rightButton}/> : null }
      //     </Row>
      //   </Column>
      // </Row>

      <div className={cx('heading')}>
        { (version === 1) ? <V1  heading={heading} /> : null }
        { (version === 2) ? <V2  title={heading.title} /> : null }
        { (version === 3) ? <V3  subtitle={heading.subtitle} /> : null }      
        { (version === 4) ? <V4  heading={heading} /> : null }
        { (version === 5) ? <V5  heading={heading} rightButton={rightButton}/> : null }
      </div>
    );

  }
}


export default Component;
