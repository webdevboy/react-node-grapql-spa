import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './customer-area.scss';
import Text from "../../components/Primitives/Text";
import Image from "../../components/Primitives/Image";
import { FormattedNumber } from 'react-intl';
import { Aircrafts } from "themes/lunajets/components/Content/Dashboard/PreferredFleets";
import Flight from "themes/lunajets/components/Content/Dashboard/Flight";
import AdvisorDetail from "themes/lunajets/components/Content/Detail/AdvisorDetail";
import PropTypes from 'prop-types';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 'upcoming',
      flights: [
        {
          title: 'In progress',
          id: 'client.lunajets.dashboard.inprogress',
          date: new Date().toISOString(),
          selected: true,
          airports: [
            {
              name: 'GVA',
              city: 'Geneva',
              countryCode: 'ch'
            },
            {
              name: 'LIS',
              city: 'Lisbon',
              countryCode: 'pt'
            },
            {
              name: 'GVA',
              city: 'Geneva',
              countryCode: 'ch'
            },
          ]
        },
        {
          title: 'Flight confirmed',
          id: 'client.lunajets.dashboard.confirmed',
          date: new Date().toISOString(),
          selected: false,
          airports: [
            {
              name: 'MAD',
              city: 'Madrid',
              countryCode: 'es'
            },
            {
              name: 'LIS',
              city: 'Lisbon',
              countryCode: 'pt'
            }
          ]
        },
      ]
    }
  }

  changeTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab });
  }

  select = (flight) => {
    let flights = [];
    this.state.flights.map(f => {
      f.selected = f.id === flight.id;
      flights.push(f);
    });

    this.setState({
      flights: flights
    });
  }

  goFlight = (flight) => {
    console.log(flight);
  }

  render() {
    const aircrafts = [
      {
        id: '12344567',
        media: {
          src: 
          'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
        },
        slug: 'Aircraft 1',
        alt: 'test',
        title: 'test',
      },
      {
        id: '12344567',
        media: {
          src: 'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
        },
        slug: 'Aircraft 2',
        alt: 'test',
        title: 'test',
      },
      {
        id: '12344567',
        media: {
          src:'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
        },
        slug: 'Aircraft 3',
        alt: 'test',
        title: 'test',
      },
    ];
    const { tab } = this.state;

    return (
      <div className={cx(s.dashboard)}>
        <div className="d-flex flex-column">
          <ul className="nav nav-tabs nav-fill" role="tablist">
            <li className="nav-item">
              <a href="#" onClick={(e) => this.changeTab(e, 'upcoming')} className={cx("nav-link", (tab === 'upcoming') ? 'active' : null)}>Upcoming Flights</a>
            </li>
            <li className="nav-item">
              <a href="#" onClick={(e) => this.changeTab(e, 'past')} className={cx("nav-link", (tab === 'past') ? 'active' : null)}>Past Flights</a> 
            </li>
          </ul>
        </div>
        <div>
          <div className="px-sm-3 px-2">
            <div className="tab-content">
              <div className={cx("tab-pane fade", (tab === 'upcoming') ? 'show active' : null)}>
                <div className={cx('py-sm-4 px-sm-3 px-0 py-0')}>
                {
                  this.state.flights.map(f => <Flight flight={f} select={this.select} goFlight={this.goFlight}/>)
                }
                </div>
                <div className={cx('row mt-sm-0 mt-3', s.section2)}>
                  <div className={cx("d-flex col-md-6 p-0")}>
                    <div className={cx('col-6 d-flex flex-column align-items-center', s.distance)}>
                      <Text defaultMessage="Distance Flown" className={cx("lt-blue", s['distance-title'])} id="client.lunajets.dashboard.distanceFlown" />
                      <span className={s["distance-value"]}>
                        <FormattedNumber value={1435} />
                        <span className={cx(s.unit)}> km</span>
                      </span>
                    </div>
                    <div className={cx('col-6 d-flex flex-column align-items-center', s.time)}>
                      <Text defaultMessage="Time Flown" className={cx("lt-blue", s['time-title'])} id="client.lunajets.dashboard.timeFlown" />
                      <span className={s["time-value"]}>
                        01<span className={s.unit}>h</span> 35<span className={s.unit}>min</span>
                      </span>
                    </div>
                  </div>
                  <div className={cx('col-md-6 text-center py-3', s["advisor-section"])}>
                    <AdvisorDetail />
                  </div>
                </div>
                <div className={cx('pt-sm-4 pt-3 px-sm-3 px-0 pb-0 pb-sm-4')}>
                  <Text defaultMessage="Preferred aircraft" className={cx("dk-blue", s.sectionTitle)} id="client.lunajets.dashboard.preferred" />
                  <Aircrafts aircrafts={aircrafts} showButtons={false} />
                </div>
              </div>
              <div className={cx("tab-pane fade", (tab === 'past') ? 'show active' : null)}>
                <div className={cx('py-sm-4 px-sm-3 px-0 py-0')}>
                {
                  this.state.flights.map(f => <Flight flight={f} select={this.select} goFlight={this.goFlight}/>)
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withStyles(s)(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
