import React from "react";
import cx from "classnames";
import moment from "moment";
import _ from "lodash";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Histories.css";
import png1 from "./gfx/seperator.png"
import Text from "../../../Primitives/Text";
import moscow from "./gfx/moscow.png";
import kualalumpur from "./gfx/kuala-lumpur.png";
import london from "./gfx/london.png";
import londonhd from "./gfx/london-hd.jpg";

class Histories extends React.Component {

  state = {
    city: londonhd,    
    histories: []
  };

  componentDidMount() {
    const months = ['no month', ...moment.months().map(month=>month.toLowerCase())];
    let { histories } = this.props;
    let tempHistories = _.cloneDeep(histories);

    if(!tempHistories) tempHistories = [];
    if(tempHistories.length > 1){
      tempHistories.sort(function(a, b) {
        return parseInt('' + b.year) - parseInt('' + a.year);
      });
    }
    
    tempHistories.forEach(h=>{
      try{        
        h.descriptions = h.descriptions.slice(0);
      }
      catch(e){
        h.descriptions = [h.descriptions];
      }
  
      if(h.descriptions.length > 1){
        h.descriptions.sort(function(a,b) {
          return months.indexOf(a.month.toLowerCase()) - months.indexOf(b.month.toLowerCase());
        });
      }
    });

    this.setState({histories: tempHistories});
  }

  enter = city => {
    switch (city) {
      case "moscow":
        this.setState({ city: moscow });
        break;
      case "london":
        this.setState({ city: londonhd });
        break;
      case "kuala":
        this.setState({ city: kualalumpur });
        break;
      default:
        this.setState({ city: londonhd });
    }
    return;
  };  

  showHistoryDesktop = show => {
    let { histories } = this.state;    
    let lists = [];    
    let date = "";

    histories.forEach((h, index)=> {
      lists.push(
        <li key={index + 'year'} className={s.yearMark}>
            <span className={(index % 2 == 0) ? cx(s.positionleft, s.hide) : cx(s.positionleft)}>{h.year}</span>
            <span className={(index % 2 == 0) ? cx(s.postionright) : cx(s.postionright, s.hide)}>{h.year}</span>
        </li>
      );
      
      h.descriptions.forEach((d)=> {
        if(d.month != '') {
          lists.push(
            <li key={index + 'year'} className={s.event}>
              <span className={(index % 2 == 0) ? cx(s.positionleft, s.month, s.hide) : cx(s.positionleft, s.month)}>{d.month}</span>
              <span className={(index % 2 == 0) ? cx(s.postionright, s.month) : cx(s.postionright, s.month, s.hide)}>{d.month}</span>
            </li>
          );
        }

        if(d.description != '') {
          lists.push(
            <li key={index + 'description'} className={s.description}>
              <span className={(index % 2 == 0) ? cx(s.positionleft, s.hide) : cx(s.positionleft)}>{d.description}</span>
              <span className={(index % 2 == 0) ? cx(s.postionright) : cx(s.postionright, s.hide)}>{d.description}</span>
            </li>
          );
        }

        if(d.percs) {
          let percsElements = [];
          d.percs.forEach((p)=> {
            percsElements.push(
              <div className={cx('d-flex mt-2 mb-2 align-items-center', (index % 2 == 0) ? 'mr-4' : 'ml-4')}>
                <img className={cx(s['icon-class'], 'mt-2')} src={p['image']} />
                <span className={cx(s['word-break'],'mr-2 ml-3')}>
                  {p.text}
                </span>
              </div>)
            }
          )
          lists.push(
            <li key={index + 'percs'} className={s.description}>
              <div className={(index % 2 == 0) ? cx(s.positionleft, s.hide) : cx(s.positionleft, s['percs-layout-left'])}>
                {percsElements}
              </div>
              <div className={(index % 2 != 0) ? cx(s.positionright, s.hide) : cx(s.positionright, s['percs-layout-right'])}>
                {percsElements}
              </div>
            </li>
          );
        }
      });
    });
    lists.push(
      <li key={'end'} className={s.end}>
      </li>
    );
    return lists;
  }

  showHistoryMobile = show => {
    let { histories } = this.state;    
    let lists = [];
    let date = "";

    histories.forEach((h, index)=> {
      lists.push(
        <li key={index + 'year'} className={s.yearMark}>
            <span className={cx(s.mobilepositionleft)}>{h.year}</span>
            <span className={cx(s.postionright, s.hide)}>{h.year}</span>
        </li>
      );

      h.descriptions.forEach((d)=> {
        if(d.month != '') {
          lists.push(
            <li key={index + 'year'} className={s.event}>
              <span className={cx(s.mobilepositionleft, s.month)}>{d.month}</span>
              <span className={cx(s.postionright, s.month, s.hide)}>{d.month}</span>
            </li>
          );
        }

        if(d.description != '') {
          lists.push(
            <li key={index + 'description'} className={s.description}>
              <span className={cx(s.mobilepositionleft, s.hide)}>{d.description}</span>
              <span className={cx(s.postionright)}>{d.description}</span>
            </li>
          );
        }

        if(d.percs) {
          let percsElements = [];
          d.percs.forEach((p)=> {
            percsElements.push(
              <div className='d-flex mr-4 mt-2 mb-2 align-items-center'>
                <img className={cx(s['icon-class'], 'mt-2')} src={p['image']} />
                <span className={cx(s['word-break'],'ml-3 mr-2')}>
                  {p.text}
                </span>
              </div>
            )
          })
          lists.push(
            <li key={index + 'percs'} className={s.description}>
              {percsElements}
            </li>
          );
        }
      });
    });
    lists.push(
      <li key={'end'} className={s.end}>
      </li>
    );
    return lists;
  }

  render() {    
    
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row pt-5">
            <div className="col-lg-12">
              <div className={cx(s.desktop, "conduit")}>
                <ul className={s.eventlist}>
                  {this.showHistoryDesktop()}
                </ul>
              </div>
              <div className={cx(s.mobile, "conduit")}>
                <ul className={s.eventlist}>
                  {this.showHistoryMobile()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Histories);
