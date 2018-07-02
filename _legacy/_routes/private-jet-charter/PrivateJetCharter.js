import React from 'react';
import history from '../../../core/history';

// import Page from '../../components/Page';
import Header from '../../../components/Layout/Header';
import RequestFlight from '../../../components/Forms/RequestFlight';
import background from '../home/gfx/background.jpg';
import CharterDescription from '../../../components/Content/Detail/Charter/CharterDescription';
import CharterVsEmptyLeg from '../../../components/Content/Detail/Charter/CharterVsEmptyLeg';
import { Aircrafts } from '../../../components/Content/Detail/Charter/FleetGrid';

const heading = {
  subtitle: {
    defaultMessage: 'Private Jet Charter',
    id: 'client.banner.subtitle.',
    color: 'lt-blue',
  },
  paragraph_line1: {
    defaultMessage: 'FLY PRIVATE AT THE',
    id: 'client.charter.param.title1',
  },
  paragraph_line2: {
    defaultMessage: 'BEST PRICE',
    id: 'client.charter.param.title2',
  },
};

const PrivateJetCharter = ({data}) => {

  console.log(data);
  const move = (e) => {
    e.preventDefault();
    return history.push('/private-jet-charter/fly-to-ozuki');
  }
  return (
    <div>
      <Header background={background}>
        <RequestFlight />
      </Header>,
      <CharterDescription heading={heading} />,
      <Aircrafts />,
      <CharterVsEmptyLeg />,
    </div>
  );
};

// async function action({ client, params, query }) {
  
//   return {
//     title: 'Private Jet Charter',
//     component: <h1>TESTE</h1>,
    
//   };
// }

export default PrivateJetCharter;
