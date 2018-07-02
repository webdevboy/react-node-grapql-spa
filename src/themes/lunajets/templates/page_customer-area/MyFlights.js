import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from "classnames";
import s from "./customer-area.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import { FormattedNumber } from 'react-intl';
import { ChevronLeft } from 'react-feather';
import Text from "themes/lunajets/components/Primitives/Text";
import Link from "themes/lunajets/components/Primitives/Link";
import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";

import Flight from "themes/lunajets/components/Content/Dashboard/Flight";
import FlightTime from "themes/lunajets/components/Content/Dashboard/FlightTime";
import FlightRoute from 'themes/lunajets/components/Content/Detail/FlightRoutes';
class MyFlights extends Component {

  state = {
    tab: 'upcoming',
    detailView: false,
    activeFlight: null
  }

  changeTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab });
  } 

  onViewList = (e) => {
    e.preventDefault();
    this.setState({ detailView: false });
  }

  onViewDetails = (flight) => {    
    this.setState({ detailView: true, activeFlight: flight });    
  }

  render() {
    const { tab, detailView, activeFlight } = this.state;
    // console.log(this.props);
    
    const settings = {
      ref: el => (this.slick = el),
      dots: true,
      arrows: false,
      autoplay: false,
      infinite: true,
      variableWidth: false,
      cssEase: "ease",
      rtl: false,
      lazyLoad: true,
      draggable: true,
      touchMove: true,
      slidesToShow: 1,
      slidesToScroll: 1      
    };

    const slides = [      
      {
        image: "http://via.placeholder.com/1280x700/ffff00/ffffff"          
      },
      {
        image: "http://via.placeholder.com/1280x700/ff00ff/0000ff"                   
      },
    ];   

    const flights = [
      {
        data: {
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
          ],
        },
        detail: {
          name1: 'Embraer',
          name2: 'Legacy 600',      
          year: '2017',
          tech: 'D-Ajet',
          manufacture: 'Large Business Jet',
          height: '6ft 1.82m',
          range: '6297km 3400nm',
          speed: '455 kts 842km/h',
    
          handling: [
            {
              airport: 'GVA, Geneva, CH',
              aviation: 'TAG Aviation',
              phone: '+41844041844'
            },
            {
              airport: 'LIS, Lisbon, PT',
              aviation: 'TAG Aviation',
              phone: '+41844041844'
            }
          ]
        },
        status: 'upcoming'
      },
      {
        data:{
          title: 'Flight confirmed',
          id: 'client.lunajets.dashboard.confirmed',
          date: new Date().toISOString(),
          selected: false,
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
          ],
        },        
        detail: {
          name1: 'Embraer',
          name2: 'Legacy 600',      
          year: '2017',
          tech: 'D-Ajet',
          manufacture: 'Large Business Jet',
          height: '6ft 1.82m',
          range: '6297km 3400nm',
          speed: '455 kts 842km/h',
    
          handling: [
            {
              airport: 'GVA, Geneva, CH',
              aviation: 'TAG Aviation',
              phone: '+41844041844'
            },
            {
              airport: 'LIS, Lisbon, PT',
              aviation: 'TAG Aviation',
              phone: '+41844041844'
            }
          ]
        },
        status: 'upcoming'
      },
      {
        data:{
          title: 'Flight confirmed',
          id: 'client.lunajets.dashboard.confirmed',
          date: new Date().toISOString(),
          selected: false,
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
          ],
        },        
        detail: {
          name1: 'Embraer',
          name2: 'Legacy 600',
          year: '2017',
          tech: 'D-Ajet',
          manufacture: 'Large Business Jet',
          height: '6ft 1.82m',
          range: '6297km 3400nm',
          speed: '455 kts 842km/h',
    
          handling: [
            {
              airport: 'GVA, Geneva, CH',
              aviation: 'TAG Aviation',
              phone: '+41844041844'
            },
            {
              airport: 'LIS, Lisbon, PT',
              aviation: 'TAG Aviation',
              phone: '+41844041844'
            }
          ]
        },
        status: 'past'
      },
    ];

    let viewDetail = activeFlight ? { ...activeFlight.detail, airports: activeFlight.airports, status: activeFlight.status } : null;
    
    return (      
      <div className={cx(s['myflights'])}>
        {
          !detailView && 
          <div>
            <div className="flex-column">
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
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className={cx("tab-pane fade", (tab === 'upcoming') ? 'show active' : null)}>
                    <div className={cx("row")}>
                      <div className={cx("col-12")}>
                        <div className={cx("d-flex", s['flights'])}>
                          <div className={cx(s['left-border'])}></div>                        
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("tab-pane fade", (tab === 'past') ? 'show active' : null)}>                    
                  </div>
                </div>
              </div>
            </div>

            <div className={cx(s['flights-container'])}>
              <div className={cx('d-none d-sm-block px-4 pt-4')}>
                {
                  flights.filter(f=>f.status == tab).map(f => <Flight flight={f.data} goFlight={()=>this.onViewDetails(f)}/>)
                }
              </div>
              <div className={cx('d-block d-sm-none pt-2 px-2')}>
                {
                  flights.filter(f=>f.status == tab).map(f => <Flight flight={f.data} goFlight={()=>this.onViewDetails(f)}/>)
                }
              </div>
            </div> 
          </div>        
        }

        {
          detailView && viewDetail &&
          <div>
            <div className={cx(s['view-detail-container'])}>
              
              <div className={cx('d-flex p-2 mb-4', s['detail-routes'])}>
                <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={(e) => this.onViewList(e)}>
                  <ChevronLeft color="white" size={36}/>
                </div>
                <div className={cx('d-flex justify-content-center w-100')}>
                  <FlightRoute airports={viewDetail.airports} color={'white'} countryBoxStyle={{marginLeft:'10px'}} countryDetailClasses={'d-flex align-items-center'}/>
                </div>
              </div>

              <div className={cx(s['detail-content'])}>
                <div className={cx('mb-4')}>
                  <FlightTime/>
                </div>

                <div className={cx('mb-5',s['aircraft'])}>
                  <div className={cx('d-none d-sm-flex h-100')}>
                    <div className={cx("pt-4", s['aircraft-info-container'])}>
                      <div className={cx('mb-3', s['sub-title'])}>
                        <div className={cx('uppercase')}>
                          <Text defaultMessage={viewDetail.name1} id="client.customer.area.aircraft.name1" />
                        </div>
                        <div>
                          <Text strong={true} defaultMessage={viewDetail.name2} id="client.customer.area.aircraft.name2" />
                        </div>                
                      </div>

                      <div className={cx("mb-1")}>
                        <Text defaultMessage={viewDetail.year} id="client.customer.area.year" />&nbsp;
                        <Text defaultMessage={viewDetail.tech} id="client.customer.area.tech" />                        
                      </div>

                      <div className={cx("mb-4")}>
                        <span>
                          <Text defaultMessage={viewDetail.manufacture} id="client.customer.area.manufacture" />
                        </span>                
                      </div>

                      <div className={cx("mb-1")}>
                        <span>
                          <Text strong={true} defaultMessage="Height: " id="client.customer.area.height" />
                        </span>
                        <span>{viewDetail.height}</span>
                      </div>

                      <div className={cx("mb-1")}>
                        <span>
                          <Text strong={true} defaultMessage="Range: " id="client.customer.area.range" />
                        </span>
                        <span>{viewDetail.range}</span>
                      </div>
                      <div className={cx("mb-1")}>
                        <span>
                          <Text strong={true} defaultMessage="Speed: " id="client.customer.area.speed" />
                        </span>
                        <span>{viewDetail.speed}</span>
                      </div>
                    </div>
                    <div className={cx(s['slider-container'])}>
                      <SlickSlider {...settings}>
                        {slides.map((slide, index) => (
                            <div className={cx(s['aircraft-img-container'])} key={`media-slide-carousel-index-${index}`}>                      
                              <img src={slide.image} alt={`${slide.title}`}/>
                            </div>
                        ))}
                      </SlickSlider>
                    </div>
                  </div>
                  <div className={cx('d-sm-none d-block h-100', s['slider-container mobile'])}>
                    <SlickSlider {...settings}>
                      {slides.map((slide, index) => (
                          <div className={cx(s['aircraft-img-container'])} key={`media-slide-carousel-index-${index}`}>                      
                            <img src={slide.image} alt={`${slide.title}`}/>
                          </div>
                      ))}
                    </SlickSlider>
                  </div>
                  <div className={cx("d-sm-none d-block p-2")}  style={{backgroundColor: '#f1f1f0'}}>
                    <div className={cx("row")}>
                      <div className={cx("col-6")}>
                        <span className={cx('uppercase')}>
                          <Text defaultMessage={viewDetail.name1} id="client.customer.area.aircraft.name1" />
                        </span>
                        &nbsp;
                        <span>
                          <Text defaultMessage={viewDetail.name2} id="client.customer.area.aircraft.name2" />
                        </span>
                      </div>
                      <div className={cx("col-6 text-right")}>
                        <Text defaultMessage={viewDetail.year} id="client.customer.area.year" />&nbsp;
                        <Text defaultMessage={viewDetail.tech} id="client.customer.area.tech" /> 
                      </div>
                    </div>                
                  </div>
                </div>

                <div className={cx(s['handling'])}>
                  <div className={cx("mb-2")}>
                    <div className={cx(s['sub-title'])}>
                      <Text className={cx('d-sm-block d-none')} defaultMessage={'Handling'} id="client.customer.area.handling" />
                      <Text className={cx('d-sm-none d-block uppercase')} defaultMessage={'Handling'} id="client.customer.area.handling" />
                    </div>                    
                  </div>
                  <div className={cx("mb-2")}>
                    {
                      viewDetail.handling.map((h, index)=>
                        <div className={cx("d-flex align-items-center mb-2", s['handling-item'])} key={`client.customer.area.handling.${index}`}>
                          <span>{h.airport}</span>
                          <span>{h.aviation}</span>
                          <span>{h.phone}</span>
                          <span className={cx(s['access-map'])}><Link to="#" className={cx("btn", s['access-map-button'])} text={'Access Map'}/></span>
                        </div>
                      )
                    }              
                  </div>
                </div>

                <div className={cx("mt-4", s['documents'])}>
                  <div className={cx("mb-3")}>
                    <div className={cx(s['sub-title'])}>
                      <Text className={cx('d-none d-sm-block')} defaultMessage={'My documents'} id="client.customer.area.document" />
                      <Text className={cx('d-sm-none d-block uppercase')} defaultMessage={'My documents'} id="client.customer.area.document" />
                    </div>              
                  </div>

                  <div className={cx("mb-3")}>
                    {
                      viewDetail.status == 'upcoming' &&
                      <div className={cx("d-flex", s['link-button-container'])}>
                        <Link to="#" className={cx("btn lt-red uppercase", s['link-button'])} text={'Contract'} id={'client.customer.area.contract.button'}/>
                        <Link to="#" className={cx("btn lt-red uppercase", s['link-button'])} text={'Flight Confirmation'} id={'client.customer.area.confirmation.button'}/>
                        <Link to="#" className={cx("btn lt-red uppercase", s['link-button'])} text={'Invoice'} id={'client.customer.area.invoice.button'}/>
                        <Link to="#" className={cx("btn lt-red uppercase", s['link-button'])} text={'PassBook'} id={'client.customer.area.passbook.button'}/>                      
                      </div>
                    }
                    {
                      viewDetail.status == 'past' &&
                      <div className={cx("d-flex", s['link-button-container'])}>
                        <Link to="doc.defaultMessage" className={cx("btn lt-red uppercase", s['link-button'])} style={{fontSize: "16px"}} text={'contact'} id={'client.customer.area.contact.button'}/>
                        <Link to="doc.defaultMessage" className={cx("btn lt-red uppercase", s['link-button'])} style={{fontSize: "16px"}} text={'invoice'} id={'client.customer.area.invoice.button'}/>                      
                      </div>
                    }                
                  </div>
                </div>
                {             
                  viewDetail.status == 'past' &&
                  <hr className={cx(s['book-again-hr'])}/>
                }         
                {             
                  viewDetail.status == 'past' &&
                  <div className={cx("d-flex justify-content-center pt-3")}>
                    <Link to="#" className={cx("btn", s['book-again-button'])} text={'BOOK AGAIN'} id={'client.bookagain'}/>                  
                  </div>
                }
              </div>                          
            </div>
          </div>          
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(s, slickCarousel, slickCarouselTheme)(MyFlights))
