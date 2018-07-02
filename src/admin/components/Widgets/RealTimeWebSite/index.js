import React from 'react';
// import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from "../Widgets.css";
import cx from 'classnames'; 
import { Line as LineChart } from 'react-chartjs';
import { Card } from "@blueprintjs/core";

// const messages = defineMessages({
//   realTimeWebsite: {
//     id: 'real.time.website.header',
//     defaultMessage: 'Real Time',
//     description: 'real.time.website.header',
//   },
//   requirements: {
//     id: 'real.time.website.requirements',
//     defaultMessage: 'Total',
//     description: 'real.time.website.requirements',
//   },
// });


class RealTimeWebsite extends React.Component {

  render() {

    const data = {
      labels: [
        '-1 min',
        '-5 min',
        '-10 min',
        '-20 min',
        '-30 min',
      ].reverse(),
      datasets: [
        {
          "fillColor":"rgba(151,187,205,0)",
          "strokeColor":"rgba(151,187,205,1)",
          "pointColor":"rgba(151,187,205,1)",
          "pointStrokeColor":"#fff",
          "pointHighlightFill":"#fff",
          "pointHighlightStroke":"rgba(151,187,205,1)",
          data: [
            72,
            300,
            452,
            600,
            1000,
          ].reverse()
        }
      ]
    };
    
    return (
      <Card className={s.widget} elevation={3} interactive>
        <h5 className={s.header}>
          <span>Real Time</span>
        </h5>

        <div className={s.content}>

          <LineChart data={data} width="530" height="250"/>

        </div>
      </Card>
    );
  }
}

export default withStyles(s)(RealTimeWebsite);
