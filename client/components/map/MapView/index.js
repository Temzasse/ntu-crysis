import React, { Component, PropTypes } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  googleMaps: PropTypes.object.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoomLevel: PropTypes.number,
  shelterMarkers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  })),
  weatherMarkers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  })),
  sectors: PropTypes.arrayOf(PropTypes.shape({
    coords: PropTypes.array.isRequired,
  })),
};

class MapView extends Component {
  constructor(props) {
    super(props);
    this.createSectors = this.createSectors.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
  }

  componentDidMount() {
    const {
      googleMaps, lat, lng, zoomLevel, shelterMarkers, weatherMarkers, sectors,
    } = this.props;

    // render Google Map
    this.map = new googleMaps.Map(this.mapRef, {
      center: { lat, lng },
      zoom: zoomLevel,
    });

    // Create placeholder for markers
    this.markers = {
      shelters: [],
      weather: [],
    };

    // Create initial markers and sectors
    this.createSectors(sectors);
    this.createShelterMarkers(shelterMarkers);
    this.createWeatherMarkers(weatherMarkers);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.weatherMarkers !== this.props.weatherMarkers) {
      this.updateWeatherMarkers(nextProps.weatherMarkers);
    }
  }

  createSectors(sectors) {
    const { googleMaps } = this.props;

    sectors.forEach(({ coords, strokeColor, fillColor }) =>
      new googleMaps.Polygon({
        paths: coords,
        strokeColor: strokeColor || '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: fillColor || '#FF0000',
        fillOpacity: 0.2,
        map: this.map,
      })
    );
  }

  createMarkers(markers, icon, type) {
    const { googleMaps } = this.props;

    markers.forEach(({ title, position }) => {
      const marker = new googleMaps.Marker(Object.assign({
        position,
        title,
        map: this.map,
        animation: googleMaps.Animation.DROP,
      }, icon ? { icon } : {}));

      const infoWindow = new googleMaps.InfoWindow({
        content: title,
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers[`${type}`].push(marker);
    });
  }

  createShelterMarkers(markers) {
    this.createMarkers(markers, '/images/crysis-logo-marker.png', 'shelters');
  }

  createWeatherMarkers(markers) {
    this.createMarkers(markers, null, 'weather');
  }

  updateWeatherMarkers(markers) {
    this.markers.weather.forEach(m => m.setMap(null));
    this.markers.weather = [];
    this.createWeatherMarkers(markers);
  }


  render() {
    return (
      <div styleName='MapView'>
        <div styleName='map' ref={ref => { this.mapRef = ref; }} />
      </div>
    );
  }

}

MapView.propTypes = propTypes;
MapView.defaultProps = {
  lat: 1.30,
  lng: 103.84,
  zoomLevel: 11,
};

export default CSSModules(MapView, styles); // { allowMultiple: true }
