import React from 'react';

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

const LegendBlock = ({values}) => (
  <div className="row block no-margin">
    <b className="label-row block">Legend:</b>
    <ul>
      {
        values.map(value => {
          const tag = tagEvaluator(value);
          return (
            <li key={`legend-tag-${value}`} className="small">
              <span className={`pt-tag pt-minimal ${tag.intent}`} style={{marginRight: '5px'}}>
                <span className={tag.icon}></span>
              </span>
              <span>
                - {tag.text}
              </span>
            </li>
          )
        })
      }
    </ul>
  </div>
)

export default LegendBlock;