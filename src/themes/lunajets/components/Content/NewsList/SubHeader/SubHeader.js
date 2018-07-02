import React, { Children } from 'react';
import { FormattedDate } from "react-intl";
import cx from 'classnames';
import s from './SubHeader.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from 'themes/lunajets/components/Primitives/Text';
import RichText from 'themes/lunajets/components/Primitives/RichText';
import PropTypes from 'prop-types';

class SubHeader extends React.Component {
  static propTypes = {
    heading: PropTypes.shape({
      title: PropTypes.object,
      subtitle: PropTypes.object,
      paragraph_line1: PropTypes.object,
      paragraph_line2: PropTypes.object,
      content: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { heading, children } = this.props;
    const V3 = ({ id, subtitle }) => (<div>
      <span className={`section-title ${(subtitle.color) ? subtitle.color : 'white'}`}><Text defaultMessage={subtitle.defaultMessage} id={subtitle.id} /></span>
    </div>);

    return (
      <div className={s['simple-sub-header']}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col')}>
              <V3 subtitle={heading.subtitle} />
            </div>
          </div>

          {/* Paragraph */}
          <div className={cx('row')}>
            <div className={cx('col-sm-7 col-12', s['paragraph-title'])}>
              {heading.paragraph_line1 &&
                <Text isHeader={true} defaultMessage={heading.paragraph_line1.defaultMessage} id={heading.paragraph_line1.id} />
              }
              {heading.paragraph_line2 &&
                <div>
                  <Text defaultMessage={heading.paragraph_line2.defaultMessage} id={heading.paragraph_line2.id} />
                </div>
              }
            </div>
            <div className={cx('col-sm-5 col-12 d-flex align-items-end')}>
              {children}
            </div>
          </div>
  
          <div className={cx('row')}>
            <div className={cx('col', s['paragraph'])}>
              <p className={cx('mb-0')}>
                {heading.content &&
                  <RichText defaultMessage={heading.content.defaultMessage} id={heading.content.id} />
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default (withStyles(s)(SubHeader));
