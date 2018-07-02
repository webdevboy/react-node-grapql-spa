import React from 'react';

const style = {
  marginRight: '5px'
};

const linkStyle = {
  marginRight: '5px',
  marginBottom: '5px',
  display: 'inline-flex'
}

const tagEvaluator = (val) => {
  switch(val) {
    case true:
    case 'published':
      return {
        text: 'Published',
        intent: "pt-intent-success",
        icon: "pt-icon-tick-circle"
      }
    case false:
    case 'draft':
      return {
        text: 'Draft',
        intent: null,
        icon: 'pt-icon-manually-entered-data'
      }
    case 'pending':
    default:
      return {
        text: 'Pending',
        intent: "pt-intent-warning",
        icon: "pt-icon-time",
      }
  }
}

const TagWrapper = ({ className, isChild, children }) => {
  const data = {
    className: `pt-tag pt-minimal ${className}`,
    style: (isChild) ? null : style
  }
  return <span {...data}>{children}</span>
}

const Tag = ({ value, selected, text, child }) => {

  const classnames = tagEvaluator(value);
  const data = {
    className: (selected) ? "pt-intent-primary" : classnames.intent,
    isChild: child
  }

  return (
    <TagWrapper {...data}>
      <span className={classnames.icon} style={style}></span>
      <span>
        {text || classnames.text}
      </span>
    </TagWrapper>
  )
}

const StateTag = ({ value, text, selected, onClick }) => {

  const data = { value, text, selected };

  if (onClick) {
    return (
      <a onClick={onClick} style={linkStyle}>
        <Tag {...data} child selected={selected || false} />
      </a>
    )
  }

  return <Tag {...data} />
  
}

export default StateTag