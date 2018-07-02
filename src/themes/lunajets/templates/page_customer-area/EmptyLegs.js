import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './empty-legs.scss';
import Text from "../../components/Primitives/Text";
import Image from "../../components/Primitives/Image";
import Button from "../../components/Primitives/Button";
import { FormattedNumber } from 'react-intl';
import { Aircrafts } from "themes/lunajets/components/Content/Dashboard/PreferredFleets";
import Flight from "themes/lunajets/components/Content/Dashboard/Flight";
import AdvisorDetail from "themes/lunajets/components/Content/Detail/AdvisorDetail";
import PropTypes from 'prop-types';
import EmptyLegsSearch from "../../components/Content/EmptyLegs/EmptyLegsSearch";
import { ChevronLeft } from 'react-feather';
import FlightRoutesEdit from '../../components/Content/Detail/FlightRoutesEdit';
import FlightRoutes from '../../components/Content/Detail/FlightRoutes';
import ArrowRight from "react-icons/lib/fa/arrow-right";
import FlightTakeoff from "react-icons/lib/md/flight-takeoff";
import SwapHoriz from "react-icons/lib/md/swap-horiz";
import Timer from "react-icons/lib/md/timer";
import AirlineSeat from "react-icons/lib/md/airline-seat-recline-normal";
import Map from "themes/lunajets/components/Widgets/MapBox";
import FormattedCurrency from "themes/lunajets/components/i18n/FormattedCurrency";
import { FormattedDate } from "react-intl";
import EmptyLegsDescription from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsDescription";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";

const editText = 'Please add your favorite departure, or destination, or route. We will save it on your profile and if you select the option we will send you an email when a relevant flight becomes available.';
const addText = 'Please add your favorite departure, or destination, or route. We will save it on your profile and if you select the option we will send you an email when a relevant flight becomes available.';
class EmptyLegs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 'all',
      content: 'tab',
      popup: '',
      selectedRoute: [],
      selectedLeg: {},
      legs: [],
      myFlightRoutes: [
        [
          {
            name: 'LIS',
            city: 'Lisbon',
            countryCode: 'pt'
          },
          {
            name: 'GVA',
            city: 'Geneva',
            countryCode: 'ch'
          }
        ],
        [
          {
            name: 'GVA',
            city: 'Geneva',
            countryCode: 'ch'
          },
          {
            name: 'LIS',
            city: 'Lisbon',
            countryCode: 'pt'
          }
        ],
        [
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
        ],
        [
          {
            name: 'GVA',
            city: 'Geneva',
            countryCode: 'ch'
          },
          {
            name: 'MAD',
            city: 'Madrid',
            countryCode: 'es'
          }
        ],
      ]
    }

    this.goMyRoutes = this.goMyRoutes.bind(this);
  }

  changeTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab });
  }
  
  goMyRoutes() {
    this.setState({
      content: 'my-routes'
    });
  }

  goMyAllRoutes = () => {
    this.setState({
      content: 'tab',
      tab: 'my'
    });
  }

  deleteRoute = (route) => {
    this.setState({
      selectedRoute: route,
      popup: 'delete'
    });
  }

  editRoute = (route) => {
    this.setState({
      selectedRoute: route,
      content: 'edit-route'
    });
  }

  addRoute = () => {
    this.setState({
      content: 'add-route'
    });
  }

  goDetail = (emptyLeg) => {
    console.log(emptyLeg);
    const legs = [];
    const fromCoordinates = emptyLeg.from_airport.coordinates.split(",").reverse();
    const toCoordinates = emptyLeg.to_airport.coordinates.split(",").reverse();
    legs.push(fromCoordinates);
    legs.push(toCoordinates);
    this.setState({
      selectedLeg: emptyLeg,
      legs: legs,
      content: 'emptyleg-detail'
    });
  }

  getContent = () => {
    const slides = [
      {
        image: "https://picsum.photos/3000/1996?image=1071"          
      },
      {
        image: "http://via.placeholder.com/1280x700/ffff00/ffffff"          
      },
      {
        image: "http://via.placeholder.com/1280x700/ff00ff/0000ff"                   
      },
    ];

    const settings = {
      ref: el => (this.slick = el),
      dots: true,
      arrows: false,
      autoplay: true,
      infinite: true,
      variableWidth: false,
      cssEase: "ease",
      rtl: false,
      lazyLoad: true,
      draggable: true,
      touchMove: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    switch(this.state.content) {
      case 'tab':
        return <div>
          <div className="px-sm-3 px-2">
            <div className="tab-content">
              <div className={cx("tab-pane fade", (this.state.tab === 'all') ? 'show active' : null)}>
                <EmptyLegsSearch pageFrom="customer-area" goDetail={this.goDetail}/>
              </div>
              <div className={cx("tab-pane fade", (this.state.tab === 'my') ? 'show active' : null)}>
                <EmptyLegsSearch pageFrom="customer-area" tabType="my" goMyRoutes={this.goMyRoutes} goDetail={this.goDetail}/>
              </div>
            </div>
          </div>
        </div>;
      case 'my-routes':
        return <div>
          <div className="row">
            <div className="col-12">
              <div className={cx('d-flex p-2 dk-blue-bg', s['detail-routes'])}>
                <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={this.goMyAllRoutes}>
                  <ChevronLeft color="white" size={24}/>
                </div>
                <div className={cx('d-flex justify-content-center align-items-center w-100', s['details-title'])}>
                  <Text defaultMessage="my routes" className="uppercase" id="client.lunajets.account.emptylegs.myroutes"/>
                </div>
              </div>
            </div>
            <div className={cx("col-12 text-center my-4")}>
              <Button defaultMessage="add route" textId="client.lunajets.account.emptylegs.addroute" className="lt-red-bg py-2" style={{fontSize: "16px", minWidth: "300px"}} onClick={this.addRoute}/>
            </div>
            <div className={cx("col-12")}>
              <div className={cx("row mx-3")}>
              {
                this.state.myFlightRoutes.map(route => <div className="col-6" style={{padding: "0 5px", marginBottom: "10px"}}>
                  <FlightRoutesEdit airports={route} deleteRoute={() => this.deleteRoute(route)} editRoute={() => this.editRoute(route)}/>
                </div>)
              }
              </div>
            </div>
          </div>
        </div>
      case 'edit-route':
        return <div>
          <div className="row">
            <div className="col-12">
              <div className={cx('d-flex p-2 dk-blue-bg', s['detail-routes'])}>
                <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={this.goMyRoutes}>
                  <ChevronLeft color="white" size={24}/>
                </div>
                <div className={cx('d-flex justify-content-center align-items-center w-100', s['details-title'])}>
                  <Text defaultMessage="edit route" className="uppercase" id="client.lunajets.account.emptylegs.myroutes"/>
                </div>
              </div>
            </div>
            <div className={cx("text-center col-12 mt-4 mb-5 px-5")}>
              <Text defaultMessage={editText} className="dk-blue" id="client.lunajets.account.emptylegs.editText"/>
            </div>
            <div className={cx("col-12")}>
              <div className={cx("px-4 d-flex align-items-center justify-content-between")}>
                <div style={{flex: 5}} className={cx("d-flex py-1 px-3", s['border-route'])}>
                  <ArrowRight color="#b6cada" style={{transform: "rotateZ(-45deg)", marginTop: "10px", marginRight: "10px"}} size={18}/>
                  <FlightRoutes airports={[this.state.selectedRoute[0]]}/>
                </div>
                <SwapHoriz size={36} color="#b6cada" style={{margin: "0 10px"}} />
                <div style={{flex: 5}} className={cx("d-flex py-1 px-3", s['border-route'])}>
                  <ArrowRight color="#b6cada" style={{transform: "rotateZ(45deg)", marginTop: "10px", marginRight: "10px"}} size={18}/>
                  <FlightRoutes airports={[this.state.selectedRoute[1]]}/>
                </div>
              </div>
            </div>
            <div className={cx("col-12 text-center my-4")}>
              <Button defaultMessage="edit route" textId="client.lunajets.account.emptylegs.addroute" className="lt-red-bg py-2" style={{fontSize: "16px", minWidth: "300px"}} onClick={this.editConfirm}/>
            </div>
          </div>
        </div>
      case 'add-route':
        return <div>
          <div className="row">
            <div className="col-12">
              <div className={cx('d-flex p-2 dk-blue-bg', s['detail-routes'])}>
                <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={this.goMyRoutes}>
                  <ChevronLeft color="white" size={24}/>
                </div>
                <div className={cx('d-flex justify-content-center align-items-center w-100', s['details-title'])}>
                  <Text defaultMessage="add route" className="uppercase" id="client.lunajets.account.emptylegs.myroutes"/>
                </div>
              </div>
            </div>
            <div className={cx("text-center col-12 mt-4 mb-5 px-5")}>
              <Text defaultMessage={addText} className="dk-blue" id="client.lunajets.account.emptylegs.editText"/>
            </div>
            <div className={cx("col-12")}>
              <div className={cx("px-4 d-flex align-items-center justify-content-between")}>
                <div className={cx("d-flex py-1 px-3", s['border-route'])}>
                  <ArrowRight color="#b6cada" style={{transform: "rotateZ(-45deg)", marginTop: "10px", marginRight: "10px"}} size={18}/>
                  {/* <FlightRoutes airports={[this.state.selectedRoute[0]]}/> */}
                </div>
                <SwapHoriz size={36} color="#b6cada" style={{margin: "0 10px"}} />
                <div className={cx("d-flex py-1 px-3", s['border-route'])}>
                  <ArrowRight color="#b6cada" style={{transform: "rotateZ(45deg)", marginTop: "10px", marginRight: "10px"}} size={18}/>
                  {/* <FlightRoutes airports={[this.state.selectedRoute[1]]}/> */}
                </div>
              </div>
            </div>
            <div className={cx("col-12 text-center my-4")}>
              <Button defaultMessage="add route" textId="client.lunajets.account.emptylegs.addroute" className="lt-red-bg py-2" style={{fontSize: "16px", minWidth: "300px"}} onClick={this.addConfirm}/>
            </div>
          </div>
        </div>
      case 'emptyleg-detail':
        return <div>
          <div className="row">
            <div className="col-12">
              <div className={cx('d-flex p-2 dk-blue-bg', s['detail-routes'])}>
                <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={this.goMyAllRoutes}>
                  <ChevronLeft color="white" size={24}/>
                </div>
                <div className={cx('d-flex justify-content-center align-items-center w-100', s['details-title'])}>
                  <Text defaultMessage="empty legs details" className="uppercase" id="client.lunajets.account.emptylegs.details"/>
                </div>
              </div>
            </div>
            <div className={cx("col-12")}>
              <div style={{height: '300px'}}>
                <Map type="emptylegs" legs={this.state.legs} emptyleg zoomControl scaleControl />
              </div>
            </div>
            <div className={cx("col-12")}>
              <div className="px-2" style={{marginTop: '-20px'}}>
                <div className="d-flex dk-blue-bg align-items-center justify-content-between pl-3 pr-2">
                  <FlightRoutes color="#fff" airports={this.state.myFlightRoutes[0]}/>
                  <span>
                    <FormattedCurrency value={this.state.selectedLeg.price} />
                  </span>
                  <Button className="uppercase lt-red-bg px-3 py-1" defaultMessage="Request this flight" onClick={this.requestFlight} style={{fontSize: "16px", border: 0}} />
                </div>
                <div className="d-flex align-items-center justify-content-between pl-3 pr-4 py-2 lt-grey-bg">
                  <div className={cx("d-flex flex-column")}>
                    <Text defaultMessage="from" className="uppercase dk-grey" id="client.emptyLeg.detail.from" />
                    <span className="dk-blue">
                      <FormattedDate value={this.state.selectedLeg.from_date} weekday="short" day="numeric" month="short" year="numeric" />
                    </span>
                  </div>
                  <div className={cx("d-flex flex-column")}>
                    <Text defaultMessage="until" className="uppercase dk-grey" id="client.emptyLeg.detail.until" />
                    <span className="dk-blue">
                      <FormattedDate value={this.state.selectedLeg.until_date} weekday="short" day="numeric" month="short" year="numeric" />
                    </span>
                  </div>
                  <div>
                    <FlightTakeoff size={24} color="#b6cada" style={{marginRight: '10px'}}/>
                    <span className="uppercase dk-blue">Dassault falcon 8x</span>
                  </div>
                  <div>
                    <Timer size={24} color="#b6cada" style={{marginRight: '10px'}}/>
                    <span className="dk-blue">2h 55min</span>
                  </div>
                  <div>
                    <AirlineSeat size={24} color="#b6cada" style={{marginRight: '10px'}}/>
                    <span className="dk-blue">18</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-12")}>
              <EmptyLegsDescription
                sectionTitle="aircraft details"
                title="dassault falcon 8x"
                style={{backgroundColor: 'white', padding: '30px 50px', sectionTitle: {fontSize: '20px'}, title: {fontSize: '24px'}}}
              />
              <div className="w-100">
                <SlickSlider {...settings}>
                  {slides.map((slide, index) => (
                      <div className={cx(s['aircraft-img-container'])} key={`media-slide-carousel-index-${index}`}>                      
                        <img src={slide.image} alt={`${slide.title}`}/>
                      </div>
                  ))}
                </SlickSlider>
              </div>
              <div className="d-flex justify-content-center my-3">
                <Button className="uppercase btn-outline dk-red" defaultMessage="discover dassault falcon 8x" />
              </div>
            </div>
          </div>
        </div>
      default:
        return <div>
          <div className="px-sm-3 px-2">
            <div className="tab-content">
              <div className={cx("tab-pane fade", (this.state.tab === 'all') ? 'show active' : null)}>
                <EmptyLegsSearch pageFrom="customer-area"/>
              </div>
              <div className={cx("tab-pane fade", (this.state.tab === 'my') ? 'show active' : null)}>
                <EmptyLegsSearch pageFrom="customer-area" tabType="my" goMyRoutes={this.goMyRoutes}/>
              </div>
            </div>
          </div>
        </div>;
    }
  }

  getPopupContent = () => {
    switch(this.state.popup) {
      case 'delete':
        return <div className={cx(s['popup-background'])}>
          <div className={cx("d-flex flex-column px-3 py-4 align-items-center justify-content-center", s['popup-content'])}>
            <Text defaultMessage="DELETE ROUTE" id="client.lunajets.account.emptylegs.deletepopup.title" className="dk-blue" style={{fontSize: "18px"}}/>
            <Text defaultMessage="Are you sure you want to delete this route?" className="dk-blue" id="client.lunajets.account.emptylegs.deletepopup.content"/>
            <div className="py-sm-3 py-1 my-2 d-flex justify-content-center w-100">
              <Button defaultMessage="yes" textId="client.lunajets.account.emptylegs.addroute" className="lt-red-bg py-2 mr-2" style={{fontSize: "16px", minWidth: "120px"}} onClick={this.confirmDelete}/>
              <Button defaultMessage="cancel" textId="client.lunajets.account.emptylegs.addroute" className="dk-blue-bg py-2" style={{fontSize: "16px", minWidth: "120px"}} onClick={this.cancel}/>
            </div>
          </div>
        </div>
      case 'edit':
        return <div className={cx(s['popup-background'])}>
          <div className={cx("d-flex flex-column px-5 py-4 align-items-center justify-content-center", s['popup-content'])}>
            <Text defaultMessage="Route edited" id="client.lunajets.account.emptylegs.deletepopup.title" className="dk-blue uppercase" style={{fontSize: "18px"}}/>
            <Text defaultMessage="Your Preferred Routes have been updated successfully!" className="dk-blue my-3 text-center" id="client.lunajets.account.emptylegs.deletepopup.content"/>
            <div className="py-1 w-100">
              <Button defaultMessage="ok" textId="client.lunajets.account.emptylegs.editok" className="lt-red-bg py-2 mr-2 w-100" style={{fontSize: "16px"}} onClick={this.cancel}/>
            </div>
          </div>
        </div>
      case 'add':
        return <div className={cx(s['popup-background'])}>
          <div className={cx("d-flex flex-column px-5 py-4 align-items-center justify-content-center", s['popup-content'])}>
            <Text defaultMessage="New route added" id="client.lunajets.account.emptylegs.deletepopup.title" className="dk-blue uppercase" style={{fontSize: "18px"}}/>
            <Text defaultMessage="Your Preferred Routes have been updated successfully!" className="dk-blue my-3 text-center" id="client.lunajets.account.emptylegs.deletepopup.content"/>
            <div className="py-1 w-100">
              <Button defaultMessage="ok" textId="client.lunajets.account.emptylegs.editok" className="lt-red-bg py-2 mr-2 w-100" style={{fontSize: "16px"}} onClick={this.cancel}/>
            </div>
          </div>
        </div>
      case 'request':
        return <div className={cx(s['popup-background'])}>
          <div className={cx("d-flex flex-column px-5 py-4 align-items-center justify-content-center", s['popup-content'])}>
            <Text defaultMessage="request this flight" id="client.lunajets.account.emptylegs.deletepopup.title" className="dk-blue uppercase" style={{fontSize: "18px"}}/>
            <div>
              <Text defaultMessage="Number of passengers:" className="lt-blue my-2 mr-2 uppercase" id="client.lunajets.account.emptylegs.deletepopup.content"/>
              <span className="dk-blue">10</span>
            </div>
            <div>
              <Text defaultMessage="Select a date:" className="lt-blue my-2 mr-2" id="client.lunajets.account.emptylegs.deletepopup.content"/>
              <span className="dk-blue uppercase">SUN, 1 APR - 17:00</span>
            </div>
            <div className="py-1 w-100">
              <Button defaultMessage="Request this flight" textId="client.lunajets.account.emptylegs.editok" className="lt-red-bg py-2 mr-2 w-100" style={{fontSize: "16px"}} onClick={this.cancel}/>
            </div>
          </div>
        </div>
    }
  }

  cancel = () => {
    this.setState({
      popup: ''
    });
  }

  confirmDelete = () => {
    this.setState({
      popup: ''
    });
  }

  editConfirm = () => {
    this.setState({
      popup: 'edit'
    });
  }

  addConfirm = () => {
    this.setState({
      popup: 'add'
    });
  }

  requestFlight = () => {
    this.setState({
      popup: 'request'
    });
  }

  render() {
    
    const { tab } = this.state;

    return (
      <div className={cx(s.emptyLegs)}>
        {
          this.state.content == 'tab' ?
          <div className="d-flex flex-column">
            <ul className="nav nav-tabs nav-fill" role="tablist">
              <li className="nav-item">
                <a href="#" onClick={(e) => this.changeTab(e, 'all')} className={cx("nav-link", (tab === 'all') ? 'active' : null)}>All</a>
              </li>
              <li className="nav-item">
                <a href="#" onClick={(e) => this.changeTab(e, 'my')} className={cx("nav-link", (tab === 'my') ? 'active' : null)}>My Empty legs</a> 
              </li>
            </ul>
          </div> : null
        }
        {this.getContent()}
        {this.getPopupContent()}
      </div>        
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withStyles(s, slickCarousel, slickCarouselTheme)(connect(mapStateToProps, mapDispatchToProps)(EmptyLegs))
