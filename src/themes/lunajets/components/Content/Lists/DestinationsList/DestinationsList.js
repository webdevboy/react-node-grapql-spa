import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DestinationsList.css';
import Text from '../../../Primitives/Text';
import moscow from './gfx/moscow.png';
import kualalumpur from './gfx/kuala-lumpur.png';
import london from './gfx/london.png';
import londonhd from './gfx/london-hd.jpg';
import SectionTitle from "../../../Layout/SectionTitle";
import Button from "../../../Primitives/Button";

class DestinationsList extends React.Component {
  render() {
    const destinationsList = [
      {
        name: "MOSCOW",
        description:
          "Majestic and imposing, like the Moskova - the river that runs through it - Moscow is a nobe and historic city. The buildings in the Kremlin and Red Square in the historic district bear witness to the architectural power of the city from the era of the Tsars.",
        imageSrc: moscow,
      },
      {
        name: "LONDON",
        description:
          "Majestic and imposing, like the Moskova - the river that runs through it - Moscow is a nobe and historic city. The buildings in the Kremlin and Red Square in the historic district bear witness to the architectural power of the city from the era of the Tsars.",
        imageSrc: london,
      },
      {
        name: "KUALA LUMPUR",
        description:
          "Majestic and imposing, like the Moskova - the river that runs through it - Moscow is a nobe and historic city. The buildings in the Kremlin and Red Square in the historic district bear witness to the architectural power of the city from the era of the Tsars.",
        imageSrc: kualalumpur,
      },
    ];
    // console.log(destinationsList);

    const { classnames, id, data } = this.props;

    return (
      <div>
        <div className="container lj-pad-y-50">
          <div className="row">
            <SectionTitle textId="client.jetCostDestination.otherDestinations" defaultMessage="Other Destinations" />
          </div>
          <div className="row py-5">
            {destinationsList.map(destination => (
              <div className="col-lg-4">
                <div className={s.destinationItem}>
                  <img src={destination.imageSrc} className="rounded" />
                  <p className={cx(s.detail, "conduit")}>
                    <b>{destination.name}</b>
                    <span>{destination.description}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Button className={cx("btn-outline-primary w-100")} textId="client.jetCostDestination.lookingForAnotherCity" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DestinationsList);
