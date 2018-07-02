import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from "classnames";
import s from "./customer-area.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import iconMessage from './gfx/message-m.svg';
import { FormattedDate } from "react-intl";
import { FormattedNumber } from 'react-intl';
import { ChevronLeft, Send, Paperclip, Plus } from 'react-feather';
import Text from "themes/lunajets/components/Primitives/Text";
import Link from "themes/lunajets/components/Primitives/Link";
import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";

import Flight from "themes/lunajets/components/Content/Dashboard/Flight";
import FlightTime from "themes/lunajets/components/Content/Dashboard/FlightTime";
import FlightRoute from 'themes/lunajets/components/Content/Detail/FlightRoutes';
import FlightRequest from "themes/lunajets/components/Content/Dashboard/FlightRequest";
class Messages extends Component {
  state = {    
    viewList: true,
    viewRequest: false,
    viewReply: false,
    activeFlight: null
  }

  onViewList = (e) => {
    e.preventDefault();
    this.setState({ viewList: true, viewRequest: false, viewReply: false });
  }

  onSelectRequest = (flight) => {    
    this.setState({ viewList: false, viewRequest: true, viewReply: false, activeFlight: flight });    
  }

  onViewReply = () => {    
    this.setState({ viewList: false, viewRequest: false, viewReply: true });    
  }

  render() {

    const { viewList, viewRequest, viewReply, activeFlight } = this.state;
    const flights = [
      {
        data: {
          title: '14:00',
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
          customer: {
            name: '',
            num: ''
          }          
        }
      },
      {
        data:{
          title: 'yesterday',
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
            }            
          ],
        },        
        detail: {
          customer: {
            name: '',
            num: ''
          }          
        }
      },
    ];

    console.log(activeFlight);

    let viewDetail = activeFlight ? { ...activeFlight.detail, airports: activeFlight.airports, date: activeFlight.data.date } : null;

    return (
      <div className={cx(s['message'])}>
        {
          viewList &&
          <div className={cx("pt-4", s['flights-container'])}>
            {
              flights.map((f, index) => 
                <div className={cx(null)} key={`client.customer.area.message.request.${index}`}>
                  <Flight flight={f.data} goIcon = {'news'} goFlight={()=>this.onSelectRequest(f)}/>
                </div>
              )
            }                          
          </div>          
        }
        {
          viewRequest &&
          <div>
            <div className={cx('d-flex p-2 mb-4', s['detail-routes'])}>
              <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={(e) => this.onViewList(e)}>
                <ChevronLeft color="white" size={36}/>
              </div>
              <div className={cx('d-flex justify-content-center w-100')}>
                <FlightRoute airports={viewDetail.airports} color={'white'}/>
              </div>
              <div className={cx('d-none d-sm-flex flex-column justify-content-center', s['detail-routes-date'])}>
                <Text className={cx('uppercase')} strong={true} defaultMessage={'Date'} id={`client.customer.area.message.flight.route.date`} style={{color: '#B6CADA'}}/>
                <FormattedDate value={viewDetail.date} weekday="short" day="2-digit" month="short" year="numeric" />
              </div>
            </div>

            <div>              
              <div className={cx("my-3", s['request-container'])}>
                <div>
                  <span className={cx("lt-grey", s["sub"])}>14:00</span>
                </div>
                <div className={cx('d-flex', s["request"])}>
                  <div className={cx(s['request-received'])}>
                    <div className={cx(s["request-received"])}>
                      <Text defaultMessage={'Flight Request Received'} id={`client.customer.area.message.request.received`} />
                    </div>
                    <div className={cx(s["from-customer"])}>
                      <Text defaultMessage={'From '} id={`client.customer.area.message.from`}/> 
                      <Text defaultMessage={'Julia Amadio'} id={`client.customer.area.message.from.customer`}/>
                    </div>
                  </div>
                  <div className={cx("mr-0", s['btn-new'])} onClick={() => this.onViewReply()}>
                    <img src={iconMessage} />
                    <Text defaultMessage={'New'} id={`client.customer.area.message.reuqest.new.button`}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {
          viewReply &&
          <div className={cx(s['reply-container'])}>
            <div className={cx('d-flex p-2 mb-4', s['detail-routes', 'reply-header'])}>
              <div className={cx('d-flex align-items-center p-2', s['arrow-right'])} onClick={(e) => this.onViewList(e)}>
                <ChevronLeft color="white" size={36}/>
              </div>
              <div className={cx('d-flex justify-content-center align-items-center w-100')}>
                <Text className={cx('uppercase')} defaultMessage="Flight Request Received" id="client.customer.area.message.received"/>                
              </div>              
            </div>
            <div className={cx('m-3', s['message-content'])}>
              <div className={cx('mb-2')}>
                <div>Dear Mr. Detroyat</div>
                <div>Thank you your flight request.</div>
              </div>
              <div className={cx('mb-5')}>
                <FlightRequest/>
              </div>
              <div style={{lineHeight: '1'}}>
                <div>We are working on your flight and will contact you soon by phone or email to discuss the diffrent options.</div>
                <div className={cx('mb-2')}>Please call us: +41844041844 id you need to speak us immediately.</div>
                <div>Sincerely.</div>
                <div>The Lunajet Team</div>
                <div>lunajet@lunajet.com</div>
                <div>+41844041844</div>
              </div>
            </div>                     
          </div>          
        }

        {
          viewReply &&
          <div className={cx(s['message-container'])}>
            <div className={cx("pt-2 pb-4 text-right")}>
              <span className={cx("lt-grey", s["sub"])}>14:00</span>
            </div>
            <div className={cx(null)}>
              <div className={cx('mb-2', s['message-text'])}>
                {/* value={this.state.bio}  onChange={this.change}*/}
                <textarea name='message' className={cx('form-control')} type='text' placeholder='Reply'/>
                <div className={cx('d-none d-sm-block', s['paper-clip-icon'])}>
                  <Paperclip color="#b6cada" size={24}/>
                </div>
                <div className={cx("d-sm-none d--block", s['plus-icon'])}>
                  <Plus color="#ef4343" size={18}/>
                </div>
                <div className={cx("d-sm-none d--block", s['send-icon'])}>
                  <Send color="#b6cada" size={24}/>
                </div>
              </div>              
              <div className={cx("btn lt-red d-none d-sm-block", s['send-button'])}>
                <Text className={cx('uppercase')} defaultMessage="Send" id="client.customer.area.message.send"/>                
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Messages))
