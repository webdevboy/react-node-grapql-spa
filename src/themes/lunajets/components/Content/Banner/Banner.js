import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'; 
import s from './Banner.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RequestFlight from '../../Forms/RequestFlight';
import Column from '../../Layout/Column';
import Row from '../../Layout/Row';
import Text from '../../Primitives/Text';
import PageHeading from '../../Layout/PageHeading';

const RightButton = ({background, color, icon, label, id}) => {
  const style = {
    background: background,
    color: color,
  }

  if (icon) {
    const Icon = request(`react-feather/dist/icons/${icon}`)
  }

  return <a className={'section-heading-button'}><Text id={id} defaultMessage={label.defaultMessage} textID={label.id}/>{ (icon) ? <Icon color={color} /> : null }</a>
}

const V1 = ({id, heading}) => {
  return (<div>
      <span className={`section-title ${(heading.title.color) ? heading.title.color : 'white'}`}><Text defaultMessage={heading.title.defaultMessage} id={heading.title.id}/></span>
      <h1 className={`section-heading ${heading.subtitle.color}`}><Text id={id} defaultMessage={heading.subtitle.defaultMessage} textID={heading.subtitle.id}/></h1>
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

const V4 = ({id, heading, rightButton}) => {
  return (<div className={'section-heading-container'}>
      <V1 heading={heading} id={id} />
      <RightButton {...rightButton} id={id}/>
    </div>)
}

const V6 = ({id, heading}) => {
  return (<div>
      <V1 heading={heading} id={id} />
      <p className={'section-heading-p'}> <Text defaultMessage={heading.paragraph.defaultMessage} id={heading.paragraph.id}/></p>
    </div>)
}

const V7 = ({id, heading, rightButton}) => {
  return (<div className={'section-heading-container'}>
      <V3 subtitle={heading.subtitle} id={id} />
      <RightButton {...rightButton} id={id}/>
    </div>)
}

class Banner extends React.Component {

  static propTypes = {
    version: PropTypes.number,
    background: PropTypes.string.isRequired,
    gradient: PropTypes.bool,
    gradientColor: PropTypes.bool,
    heading: PropTypes.shape({
      title: PropTypes.object,
      subtitle: PropTypes.object,
      paragraph: PropTypes.object,
    }),
    requestFlight: PropTypes.bool,
    rightButton: PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.element,
      label: PropTypes.object,
    })
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { version, children, classnames, id, background, heading, rightButton, gradient, gradientColor, requestFlight } = this.props;
    const bg = {
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: 'center',
      backgroundPositionX: 'center',
      backgroundSize: 'cover',
      height: '500px',
      justifyContent: 'center',
    };


    return (
      <div className={s['banner']}>
        <Row className={s['banner-background']} style={bg} data-type={this.props['data-type']} data-key={id}/>
        <div className={cx('container')}>
          <div className={s['banner-heading']}>
            <PageHeading {...this.props}/>
          </div>
        </div>        
      </div>
    );
    
  }
}

export default (withStyles(s)(Banner));

