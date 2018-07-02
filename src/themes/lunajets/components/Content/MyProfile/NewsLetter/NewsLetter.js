import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./NewsLetter.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import Switch from 'themes/lunajets/components/Primitives/Switch';

class NewsLetter extends React.Component {
  render() {  

    return (
      <div className={cx(s["news-letter-root"])}>
        <div className={cx(s.controls)}>
          <h1 className={s.title}>
            <Text id="client.news.letter.title" defaultMessage="Newsletter" />
          </h1>
          <Switch onChange={() => console.log('changed!')} name="newsletter" version={2} />
        </div>
        <div className={s.desc}>
          <Text id="client.news.letter.desc" defaultMessage="You are currently subscribed to the LunaJets newsletter." />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NewsLetter);
