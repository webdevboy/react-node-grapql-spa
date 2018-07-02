import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import s from "./mapBox.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import markerIcon from "./gfx/pin_red.svg";

class MapBox extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    this.state = {
      center: undefined,
      zoom: [this.props.zoom || 2],
      interactive: this.props.interactive || true,
    };

    this.isDragging = false;
    this.isCursorOverPoint = false;
  }

  renderLocation = (location, index) => {
    const { Feature } = this;
    return <Feature key={`location-${index}`} coordinates={location} />;
  }

  renderMap = () => {
    const { Mapa, Layer, Feature, Popup, ZoomControl, ScaleControl, Source, GeoJSONLayer, images } = this;
    const { zoom, center, interactive } = this.state;
    const { locations, type, zoomControl, zoomPostition, scaleControl } = this.props;

    const routes = [];

    return (<Mapa
      style="mapbox://styles/mapbox/light-v9"
      containerStyle={{
        height: "300px",
        width: "500px",
      }}
      center={locations[0]}
      flyToOptions={{
        speed: 0.8,
      }}
    >
      {
        (type === "marker") ?
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "pin", "icon-anchor": "bottom" }}
          >
            { locations && locations.map((location, index) => this.renderLocation(location, index)) }
          </Layer>
          : null
      }

    </Mapa>);
  }

  componentDidMount() {
    const pin = new Image(29, 40); // eslint-disable-line import/no-unresolved
    pin.src = markerIcon; // eslint-disable-line import/no-unresolved
    this.images = [["pin", pin]];

    const ReactMapboxGl = require("react-mapbox-gl");
    const { scrollZoom = false, interactive = true } = this.props;

    this.Mapa = ReactMapboxGl.Map({
      accessToken: "pk.eyJ1IjoibHVuYWpldHMiLCJhIjoiS3EtcFlnNCJ9.fAgl4sBXAEOFAEf-wxRSWw",
      dragRotate: false,
      interactive,
      scrollZoom,
      minZoom: 1,
      maxZoom: 7,
    });

    this.Layer = ReactMapboxGl.Layer;
    this.Feature = ReactMapboxGl.Feature;
    this.Popup = ReactMapboxGl.Popup;
    this.ZoomControl = ReactMapboxGl.ZoomControl;
    this.ScaleControl = ReactMapboxGl.ScaleControl;
    this.Source = ReactMapboxGl.Source;
    this.GeoJSONLayer = ReactMapboxGl.GeoJSONLayer;

    this.setState({ active: true });
  }

  render() {
    const { Mapa, Layer, Feature, Popup, images } = this;
    const { zoom, center, active } = this.state;
    const { locations } = this.props;

    return (
      <div ref={el => this.mapBox = el} className={s.container}>
        { (active) ? this.renderMap : null }
      </div>
    );
  }
}

export default (withStyles(s)(MapBox));
