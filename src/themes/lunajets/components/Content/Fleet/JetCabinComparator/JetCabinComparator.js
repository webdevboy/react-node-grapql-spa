import React from "react";
import cx from "classnames";
import s from "./JetCabinComparator.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Aircraft1 from "./gfx/aircraft1.svg";
import Aircraft2 from "./gfx/aircraft2.svg";
import XAxis from "./gfx/x-axis.svg";
import YAxis from "./gfx/y-axis.svg";
import Man from "./gfx/man.svg";
import Switch from "../../../Primitives/Switch";
import FormattedUnits from "../../../i18n/FormattedUnits";
import Text from "../../../Primitives/Text";
import SectionTitle from "../../../Layout/SectionTitle";
import Loading from "react-loading-animation";

class JetDetailCabin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "imperial",
      isMobile: false
    };
  }

  getStyles = (big, small) => {
    let styles = {
      width: '500px',
      height: '365px',
      backgroundImage: `url(${Aircraft2})`,
      bottom: '35px',
      marginLeft: '60px'
    };

    if (this.state.isMobile) {
      styles = {
        width: '207px',
        height: '170px',
        backgroundImage: `url(${Aircraft2})`,
        bottom: '7px',
        marginLeft: '27px'
      };
    }

    let transformX = 1, transformY = 1;

    if (big.details && small.details && big.details.w_cabin_height__c && small.details.w_cabin_height__c) {
      transformY = small.details.w_cabin_height__c / big.details.w_cabin_height__c;
    } else {
      transformY = 1;
    }

    if (big.details && small.details && big.details.w_cabin_width__c && small.details.w_cabin_width__c) {
      transformX = small.details.w_cabin_width__c / big.details.w_cabin_width__c;
    } else {
      transformX = 1;
    }

    styles.transform = `scale(${transformX}, ${transformY})`;
    styles.transformOrigin = '0 365px';
    if (this.state.isMobile) {
      styles.transform = `scale(${transformX}, ${transformY})`;
      styles.transformOrigin = '0 170px';
    }

    return styles;
  }

  getXaxis = (big, small) => {
    let styles = {
      width: '500px',
      height: '365px',
      bottom: '10px',
      marginLeft: '53px',
      position: 'absolute',
      borderRight: '1px solid #ccc'
    };

    if (this.state.isMobile) {
      styles = {
        width: '207px',
        height: '170px',
        bottom: '3px',
        marginLeft: '27px',
        position: 'absolute',
        borderRight: '1px solid #ccc'
      };
    }

    if (big.details && small.details && big.details.w_cabin_height__c && small.details.w_cabin_height__c) {
      styles.height = 400 * small.details.w_cabin_height__c * 3 / (big.details.w_cabin_height__c * 7) + 'px';
    } else {
      styles.height = 400 * 3 / 7 + 'px';
    }

    if (big.details && small.details && big.details.w_cabin_width__c && small.details.w_cabin_width__c) {
      styles.width = 500 * small.details.w_cabin_width__c / big.details.w_cabin_width__c + 'px';
    } else {
      styles.width = '500px';
    }

    if (this.state.isMobile) {
      if (big.details && small.details && big.details.w_cabin_height__c && small.details.w_cabin_height__c) {
        styles.height = 170 * small.details.w_cabin_height__c * 3 / (big.details.w_cabin_height__c * 7) + 'px';
      } else {
        styles.height = 170 * 3 / 7 + 'px';
      }
  
      if (big.details && small.details && big.details.w_cabin_width__c && small.details.w_cabin_width__c) {
        styles.width = 207 * small.details.w_cabin_width__c / big.details.w_cabin_width__c + 'px';
      } else {
        styles.width = '207px';
      } 
    }

    return styles;
  }

  getYaxis = (big, small) => {
    let styles = {
      width: '500px',
      height: '365px',
      bottom: '35px',
      marginLeft: '10px',
      position: 'absolute',
      borderTop: '1px solid #ccc'
    };

    if (this.state.isMobile) {
      styles = {
        width: '207px',
        height: '170px',
        bottom: '7px',
        marginLeft: '3px',
        position: 'absolute',
        borderTop: '1px solid #ccc'
      };
    }

    if (big.details && small.details && big.details.w_cabin_height__c && small.details.w_cabin_height__c) {
      styles.height = 365 * small.details.w_cabin_height__c / big.details.w_cabin_height__c + 'px';
    } else {
      styles.height = '365px';
    }

    if (big.details && small.details && big.details.w_cabin_width__c && small.details.w_cabin_width__c) {
      styles.width = 560 * small.details.w_cabin_width__c / (big.details.w_cabin_width__c * 2) + 'px';
    } else {
      styles.width = '280px';
    }

    if (this.state.isMobile) {
      if (big.details && small.details && big.details.w_cabin_height__c && small.details.w_cabin_height__c) {
        styles.height = 163 * small.details.w_cabin_height__c / big.details.w_cabin_height__c + 'px';
      } else {
        styles.height = '163px';
      }
  
      if (big.details && small.details && big.details.w_cabin_width__c && small.details.w_cabin_width__c) {
        styles.width = 234 * small.details.w_cabin_width__c / (big.details.w_cabin_width__c * 2) + 'px';
      } else {
        styles.width = '117px';
      }
    }

    return styles;
  }

  updateBrowserStatus = () => {
    this.setState({
      isMobile: window.innerWidth <= 768
    });
  };

  componentDidMount() {
    this.updateBrowserStatus();
    window.addEventListener("resize", this.updateBrowserStatus.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateBrowserStatus.bind(this));
  }

  render() {
    const { unit } = this.state;
    const { comparedAircrafts } = this.props;
    // console.log(comparedAircrafts);
    let big, small;
    if (comparedAircrafts[0].details && comparedAircrafts[1].details && comparedAircrafts[0].details.w_cabin_height__c 
    && comparedAircrafts[1].details.w_cabin_height__c 
    && comparedAircrafts[0].details.w_cabin_height__c > comparedAircrafts[1].details.w_cabin_height__c) {
      big = comparedAircrafts[0];
      small = comparedAircrafts[1];
    } else {
      big = comparedAircrafts[1];
      small = comparedAircrafts[0];
    }

    return (
      <Loading isLoading={this.props.isFetching}>
      <section className={cx(s["cabin-specifications"])}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <SectionTitle textId="client.jetComparator.cabinComparison.sectionTitle" defaultMessage="cabin comparison" />
            </div>
          </div>

          <div className={cx("row")}>

            {/* cabin height width */}
            <div className={cx("col-12")}>
              <div className={cx("row mb-3 mt-5 mt-md-0")}>
                <div className={cx("col", s["cabin-container"])}>
                  <img className={cx(s["svg-cabin"])} src={Aircraft1}/>
                  <div className={cx(s["svg-cabin"])} style={this.getStyles(big, small)} />
                  <div className="x-axis" style={this.getXaxis(big, small)}/>
                  <div className="y-axis" style={this.getYaxis(big, small)}/>
                </div>
              </div>

              <div className={cx("row")}>
                <div className={cx("col")}>
                  <span className={cx(s["square"], 'dk-red-bg')}></span>
                  <span className={cx(s["value"], 'dk-red')}>
                    <Text defaultMessage={big.title} id="client.jetPlane1.title" />
                  </span>
                </div>
                <div className={cx("col text-right")}>
                  <span className={cx(s["square"], 'dk-blue-bg')}></span>
                  <span className={cx(s["value"], 'dk-blue')}>
                    <Text defaultMessage={small.title} id="client.jetPlane2.title" />
                  </span>
                </div>
              </div>
              <div className={cx("row")}>
                <div className={cx("col")}>
                  <span className={cx(s["property"])}>
                    <Text defaultMessage="height" id="client.jetPlane1.height" />
                  </span>
                  <span className={cx(s["value"], 'dk-red')}>
                    <FormattedUnits unit={unit} value={big.details && big.details.w_cabin_height__c} />
                  </span>
                </div>
                <div className={cx("col text-right")}>
                  <span className={cx(s["property"])}>
                    <Text defaultMessage="height" id="client.jetPlane2.height" />
                  </span>
                  <span className={cx(s["value"], 'dk-blue')}>
                    <FormattedUnits unit={unit} value={small.details && small.details.w_cabin_height__c} />
                  </span>
                </div>
              </div>

              <div className={cx("row")}>
                <div className={cx("col")}>
                  <span className={cx(s["property"])}>
                    <Text defaultMessage="width" id="client.jetPlane1.width" />
                  </span>
                  <span className={cx(s["value"], 'dk-red')}>
                    <FormattedUnits unit={unit} value={big.details && big.details.w_cabin_width__c} />
                  </span>
                </div>
                <div className={cx("col text-right")}>
                  <span className={cx(s["property"])}>
                    <Text defaultMessage="width" id="client.jetPlane2.width" />
                  </span>
                  <span className={cx(s["value"], 'dk-blue')}>
                    <FormattedUnits unit={unit} value={small.details && small.details.w_cabin_width__c} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Loading>
    );
  }
}

export default withStyles(s)(JetDetailCabin);
