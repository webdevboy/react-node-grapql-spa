import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import s from "./MapBox.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import markerIcon from "./gfx/pin_red.svg";
import markerIconHover from "./gfx/pin_dark-red.svg";
import markerArrival from "./gfx/arrival.svg";
import markerDeparture from "./gfx/departure.svg";
import markerStop from "./gfx/stop.svg";
import { arc } from "./arc";

function getMinOrMax(markersObj, minOrMax, latOrLng) {
  if (minOrMax == "max") {
    return _.maxBy(markersObj, function(value) {
      return value[latOrLng];
    })[latOrLng];
  } else {
    return _.minBy(markersObj, function(value) {
      return value[latOrLng];
    })[latOrLng];
  }
}

function getBounds(markersObj) {
  var maxLat = getMinOrMax(markersObj, "max", "lat");
  var minLat = getMinOrMax(markersObj, "min", "lat");
  var maxLng = getMinOrMax(markersObj, "max", "lng");
  var minLng = getMinOrMax(markersObj, "min", "lng");

  var southWest = [minLng, minLat];
  var northEast = [maxLng, maxLat];
  return [southWest, northEast];
}

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    var center = [6.0795562, 46.2250178];
    var zoom = [2];
    var scale = 2;
    if (this.props.zoom) {
      zoom = [this.props.zoom];
      scale = zoom;
    }
    if (this.props.locations && this.props.locations[0].coordinates) {
      center = this.props.locations[0].coordinates.split(",").reverse();
      scale = zoom
    }

    if (this.props.legs && this.props.legs.length > 1) {
      center = [(parseFloat(this.props.legs[0][0]) + parseFloat(this.props.legs[1][0]))/2,
        (parseFloat(this.props.legs[0][1]) + parseFloat(this.props.legs[1][1]))/2];
      zoom = [1];
      scale = 2;
    }
    this.state = {
      office: undefined,
      center: center,
      zoom: zoom,
      interactive: this.props.interactive || true,
      maxZoom: this.props.maxZoom || 7,
      rangePoint: center,
      isRangePopup: true,
      scale: scale,
      originalZoom: zoom
    };

    this.isDragging = false;
    this.isCursorOverPoint = false;
    this.mapZoomValue = 1;
  }

  onToggleHover = (cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
  }

  markerClick = (office) => {

    this.setState({
      center: office && office.coordinates ? office.coordinates.split(",").reverse() : [6.0795562, 46.2250178],
      zoom: [3],
      office,
    });
  };

  // onDrag = () => {
  //   if (this.state.office) {
  //     this.setState({ office: undefined });
  //   }
  // };

  // zoomClick = ({map, zoomDiff}) => {
  //   console.log('onControlClick: ', map, zoomdiff)
  // }

  togglePopup = () => {
    this.setState({
      isRangePopup: !this.state.isRangePopup
    });
  }

  moveRangeMarker = ({ map }) => {
    this.isCursorOverPoint = true;
    map.dragPan.disable();
    map.getCanvas().style.cursor = "move";
  };

  unMoveRangeMarker = ({ map }) => {
    this.isCursorOverPoint = false;
    map.dragPan.enable();
    map.getCanvas().style.cursor = '';
  };

  mapZoomStart = (map) => {
    this.mapZoomValue = map.getZoom();
  }

  mapZoomEnd = (map) => {
    const currentZoom =  map.getZoom();
    this.setState({
      zoom: [currentZoom],
      scale: map.transform.scale/map.transform.zoom
    });
  }

  mapMouseDown = (map) => {
    if (!this.isCursorOverPoint) return;

    this.isDragging = true;

    this.setState({
      isRangePopup: false
    });

    map.on('mousemove', this.onMove);
    map.once('mouseup', this.onUp);
  }

  onMove = map => {
    if (!this.isDragging) return;
    const coords = map.lngLat;
    map.target.getCanvas().style.cursor = 'grabbing';

    // let geojsonMarker = map.target.getSource('markerRange')._data;
    // let geojsonRange = map.target.getSource('range')._data;

    // geojsonMarker.features[0].geometry.coordinates = [coords.lng, coords.lat];
    // geojsonRange.features[0].geometry.coordinates = [coords.lng, coords.lat];

    // map.target.getSource('markerRange').setData(geojsonMarker);
    // map.target.getSource('range').setData(geojsonRange);
  }

  onUp = map => {
    if (!this.isDragging) return;

    map.target.getCanvas().style.cursor = '';
    this.isDragging = false;
    const coords = map.lngLat;
    // let geojsonMarker = map.target.getSource('markerRange')._data;
    // let geojsonRange = map.target.getSource('range')._data;
    // geojsonMarker.features[0].geometry.coordinates = [coords.lng, coords.lat];
    // geojsonRange.features[0].geometry.coordinates = [coords.lng, coords.lat];

    // map.target.getSource('range').setData(geojsonRange);
    // if (this.props.mapboxType == 'jet compare') {
    //   map.target.getSource('range2').setData(geojsonMarker);
    // }
    // map.target.getSource('markerRange').setData(geojsonMarker);

    // console.log("*******", map.target.getSource('range')._data);

    this.setState({
      rangePoint: [coords.lng, coords.lat]
    });
    // Unbind mouse events
    map.target.off("mousemove", this.onMove);
  };

  renderMap = () => {
    const { Mapa, Layer, Feature, Popup, ZoomControl, ScaleControl, Source, GeoJSONLayer, images } = this;
    const { zoom, center, office, active, interactive, rangePoint, isRangePopup, maxZoom, scale, originalZoom } = this.state;
    const { locations, type, range, zoomControl, zoomPostition, scaleControl, legs, mapboxType, ranges, scrollZoom } = this.props;
    let routes = [];

    let points = [];

    if (type === "emptylegs") {
      points = legs;
      legs.map((leg, index) => {
        if (index < legs.length - 1 && index % 2 == 0) {
          const start = { x: legs[index][0], y: legs[index][1] };
          const end = { x: legs[index + 1][0], y: legs[index + 1][1] };
          const generator = new arc.GreatCircle(start, end, { name: `Leg ${index + 1} From To ${index + 2}` });
          const line = generator.Arc(100, { offset: 10 }).json();
          routes.push({
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {
                    color: "#94A1AC",
                  },
                  geometry: {
                    type: "LineString",
                    coordinates: line.geometry.coordinates,
                  },
                },
              ],
            },
          });
        }
      });
    } else if (type === "legs") {
      points = legs;
      legs.map((leg, index) => {
        if (index < legs.length - 1) {
          const start = { x: legs[index][0], y: legs[index][1] };
          const end = { x: legs[index + 1][0], y: legs[index + 1][1] };
          const generator = new arc.GreatCircle(start, end, { name: `Leg ${index + 1} From To ${index + 2}` });
          const line = generator.Arc(100, { offset: 10 }).json();
          routes.push({
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {
                    color: "#94A1AC",
                  },
                  geometry: {
                    type: "LineString",
                    coordinates: line.geometry.coordinates,
                  },
                },
              ],
            },
          });
        }
      });
    } else {
      points = locations.map(office => {
        return office.coordinates.split(",").reverse();
      });
    }

    const boundOptions = {
      padding: this.props.emptyleg
        ? { top: 120, bottom: 200, left: 20, right: 20 }
        : { top: 120, bottom: 100, left: 20, right: 20 },
      minZoom: this.props.locations ? 4 : 3,
      scrollZoom: !scrollZoom ? false : true,
    };

    const bounds = _.reduce(
      points,
      (aggregator, val, key) => {
        aggregator.push({
          lng: parseFloat(val[0]),
          lat: parseFloat(val[1]),
        });
        return aggregator;
      },
      []
    );

    const fitBounds = getBounds(bounds);

    const ratio = zoom*scale/100;
    
    return (
      <Mapa
        style="mapbox://styles/mapbox/light-v9"
        onDrag={this.onDrag}
        fitBounds={originalZoom === zoom ? (legs || fitBounds || null) : null}

        fitBoundsOptions={boundOptions}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        flyToOptions={{
          speed: 0.8
        }}
        center={center}
        zoom={zoom}
        attributionControl={false}
        onMouseDown={this.mapMouseDown.bind(this)}
        onZoomEnd={this.mapZoomEnd.bind(this)}
        onZoomStart={this.mapZoomStart.bind(this)}
      >

        <Layer
          type="symbol"
          id="images"
          images={images}>
        </Layer>

        {zoomControl ? <ZoomControl position={'topLeft'} /> : null}
        {scaleControl ? <ScaleControl position={'bottomLeft'} measurement={'km'} /> : null}


        {type == 'marker' ?
        <Layer
          type="symbol"
          id="marker"
          layout={{ 'icon-image': 'office', 'icon-anchor': 'bottom' }}>

          {
            locations ?
              locations.map((location, index) => <Feature
                key={location.id}
                coordinates={location.coordinates.split(',').reverse()}
                onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                onMouseLeave={this.onToggleHover.bind(this, '')}
                onClick={this.markerClick.bind(this, location)}
              />) : null
          }

        </Layer>
        : null
      }

        {type == 'marker' ?
        office && (
          <Popup
            key={`popup-${office.id}`}
            offset={[120, 0]}
            className={s['office-popup']}
            coordinates={office.coordinates.split(',').reverse()}>
            <div className={s['map-popup']}>
              <span className={s['office-text']}>
                {office.meta && office.meta.address && 
                (typeof office.meta.address !== 'string')
                ?
                office.meta.address.map(ad => {
                  return <p>{ad}</p>
                })
                : <p>{office.meta.address}</p>
                }
                <p>{office.name}</p>
              </span>
            </div>
          </Popup>
        ) : null}

        {type == "range" ? (
          <div>
            {
            mapboxType == 'jet compare' ?
            <Layer
              type="circle"
              id="range2"
              paint={{
                'circle-radius': ranges ? ranges[0]*ratio : range*ratio,
                'circle-color': '#aa0000',
                'circle-opacity': 0.2,
                'circle-stroke-color': '#cc0000',
                'circle-stroke-width': 2,
                'circle-stroke-opacity': 1
              }}>
              {points && points.map((point, index) => {
                return <Feature key={`map-range-${index}`} coordinates={rangePoint}/>
              })}

            </Layer> : null
          }

            <Layer
              type="circle"
              id="range"
              paint={{
                'circle-radius': ranges ? ranges[1]*ratio : range*ratio,
                'circle-color': '#c6e6fb',
                'circle-opacity': 0.7,
                'circle-stroke-color': '#9AA6B1',
                'circle-stroke-width': 2,
                'circle-stroke-opacity': 1
            }}>
              <Feature key={`map-range-circle`} coordinates={rangePoint} />
          </Layer>

          <Layer
            type="symbol"
            id="markerRange"
            layout={{ 'icon-image': 'office' }}>
             <Feature
                key={`map-marker-range`}
                onMouseEnter={this.moveRangeMarker.bind(this)}
                onMouseLeave={this.unMoveRangeMarker.bind(this)}
                onClick={this.togglePopup.bind(this)}
                draggable={true}
                coordinates={rangePoint}/>
            </Layer>

            {isRangePopup &&
              <Popup
                key={`map-marker-popup`}
                offset={[0, -30]}
                coordinates={rangePoint}>
                <div className={s['map-popup-range']}>
                  <p>
                    Move the pointer on the map
                  </p>
                </div>
              </Popup>
            }
          </div>
        ) : null}

        {type === "legs"
          ? routes.map((route, index) => {
              return (
                <div key={index}>
                  <Source id={`line_source_${index}`} geoJsonSource={route} />

                  <Layer
                    id={`leg_line_${index}`}
                    type="line"
                    sourceId={`line_source_${index}`}
                    paint={{
                      "line-color": {
                        type: "identity",
                        property: "color",
                      },
                      "line-width": 10,
                      "line-opacity": 0.6,
                    }}
                    layout={{ "line-cap": "round" }}
                  />

                  <Layer
                    type="symbol"
                    id={`markerLeg1_${index}`}
                    layout={{ "icon-image": index === 0 ? "legDeparture" : "legStop", "icon-anchor": "bottom" }}
                  >
                    <Feature coordinates={legs[index]} />
                  </Layer>

                  <Layer
                    type="symbol"
                    id={`markerLeg2_${index}`}
                    layout={{
                      "icon-image": index + 1 === legs.length - 1 ? "legArrival" : "legStop",
                      "icon-anchor": "bottom",
                    }}
                  >
                    <Feature coordinates={legs[index + 1]} />
                  </Layer>
                </div>
              );
            })
          : null}
        {type === "emptylegs"
          ? routes.map((route, index) => {
              return (
                <div key={index}>
                  <Source id={`line_source_${index}`} geoJsonSource={route} />
                  <Layer
                    id={`leg_line_${index}`}
                    type="line"
                    sourceId={`line_source_${index}`}
                    paint={{
                      "line-color": {
                        type: "identity",
                        property: "color",
                      },
                      "line-width": 10,
                      "line-opacity": 0.6,
                    }}
                    layout={{ "line-cap": "round" }}
                  />
                  <Layer
                    type="symbol"
                    id={`markerLeg_${index * 2}`}
                    layout={{ "icon-image": "legDeparture", "icon-anchor": "bottom" }}
                  >
                    <Feature coordinates={legs[index * 2]} />
                  </Layer>
                  <Layer
                    type="symbol"
                    id={`markerLeg_${index * 2 + 1}`}
                    layout={{ "icon-image": "legArrival", "icon-anchor": "bottom" }}
                  >
                    <Feature coordinates={legs[index * 2 + 1]} />
                  </Layer>
                </div>
              );
            })
          : null}
      </Mapa>
    );
  };

  componentDidMount() {
    const officeIcon = new Image(29, 40); // eslint-disable-line import/no-unresolved
    const officeIconHover = new Image(29, 40); // eslint-disable-line import/no-unresolved
    const legDepartureIcon = new Image(29, 40);
    const legArrivalIcon = new Image(29, 40);
    const legStopIcon = new Image(29, 40);

    officeIcon.src = markerIcon; // eslint-disable-line import/no-unresolved
    officeIconHover.src = markerIconHover; // eslint-disable-line import/no-unresolved
    legDepartureIcon.src = markerDeparture;
    legArrivalIcon.src = markerArrival;
    legStopIcon.src = markerStop;

    this.images = [
      ["office", officeIcon],
      ["office-hover", officeIconHover],
      ["legDeparture", legDepartureIcon],
      ["legArrival", legArrivalIcon],
      ["legStop", legStopIcon],
    ];

    const ReactMapboxGl = require("react-mapbox-gl");
    const { scrollZoom, interactive = true } = this.props;

    this.Mapa = ReactMapboxGl.Map({
      accessToken: "pk.eyJ1IjoibHVuYWpldHMiLCJhIjoiS3EtcFlnNCJ9.fAgl4sBXAEOFAEf-wxRSWw",
      dragRotate: false,
      interactive: true,
      scrollZoom: scrollZoom,
      minZoom: 1,
      maxZoom: this.state.maxZoom,
    });

    this.Layer = ReactMapboxGl.Layer;
    this.Feature = ReactMapboxGl.Feature;
    this.Popup = ReactMapboxGl.Popup;
    this.ZoomControl = ReactMapboxGl.ZoomControl;
    this.ScaleControl = ReactMapboxGl.ScaleControl;
    this.Source = ReactMapboxGl.Source;
    this.GeoJSONLayer = ReactMapboxGl.GeoJSONLayer;

    this.setState({
      active: true,
    });
  }

  render() {
    const { Mapa, Layer, Feature, Popup, images } = this;
    const { zoom, center, office, active } = this.state;
    const { locations } = this.props;

    return (
      <div ref={el => (this.mapBox = el)} className={s["container"]}>
        {active ? <this.renderMap /> : null}
      </div>
    );
  }
}

export default withStyles(s)(MapBox);
