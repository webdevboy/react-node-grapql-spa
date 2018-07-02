import React from 'react';
import { FormattedDate } from 'react-intl';
import cx from 'classnames';
import s from './CharterVsEmptyLeg.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from '../../../../Primitives/Text';
import Video from '../../../../Primitives/Video';
import video from '../gfx/big_buck_bunny.mp4';
import DraftjsDecoder from 'utils/DraftjsDecoder';

import _ from 'lodash';

class CharterVsEmptyLeg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { sub } = this.props;
    const heading = {
      subtitle: {
        defaultMessage: 'CHARTER VS EMPTY LEG',
        id: 'client.banner.subtitle.',
        color: 'lt-blue',
      },
    };
    const V3 = ({ id, subtitle }) => (
      <div>
        <span
          className={`section-title ${
              subtitle.color ? subtitle.color : 'white'
            }`}
        >
          <Text defaultMessage={subtitle.defaultMessage} id={subtitle.id}/>
        </span>
      </div>
    );

    return (
      <div className={s['charter-empty-leg']}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col')}>
              <V3 subtitle={heading.subtitle} />
            </div>
          </div>

          {/* Paragraph */}
          <div className={cx('row')}>
            <div className={cx('col', s['paragraph-title'])}>
              <span>THE DIFFERENCES</span>
            </div>
          </div>

          <div className={cx('row')}>
            <div className={cx('col', s.paragraph)}>
              <p>
                {sub &&
                  <DraftjsDecoder contentState={sub} />
                }
              </p>
            </div>
          </div>
        </div>

        {/* video */}
        <div className={cx('container-fluid')}>
          <div className={cx('row')}>
            <Video
              playing={false}
              source={video}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CharterVsEmptyLeg);
