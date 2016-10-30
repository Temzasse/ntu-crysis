import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
// import { mapNightModeStyles } from '../../../static/dummyData';
import { mapTheme } from '../../../static/dummyData';

// Styles
import styles from './index.scss';

const markerPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired);

const propTypes = {
  googleMaps: PropTypes.object.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoomLevel: PropTypes.number,
  shelterMarkers: markerPropType,
  weatherMarkers: markerPropType,
  incidentMarkers: markerPropType,
  sectors: PropTypes.arrayOf(PropTypes.shape({
    coords: PropTypes.array.isRequired,
  })),
  activeIncident: PropTypes.object,
};

class MapView extends Component {
  constructor(props) {
    super(props);
    this.createSectors = this.createSectors.bind(this);
    this.createMarkers = this.createMarkers.bind(this);
    this.createShelterMarkers = this.createShelterMarkers.bind(this);
    this.createWeatherMarkers = this.createWeatherMarkers.bind(this);
    this.createIncidentMarkers = this.createIncidentMarkers.bind(this);
    this.openIncidentInfoWindow = this.openIncidentInfoWindow.bind(this);
    this.closeIncidentInfoWindows = this.closeIncidentInfoWindows.bind(this);
  }

  componentDidMount() {
    const {
      googleMaps, lat, lng, zoomLevel,
      incidentMarkers, shelterMarkers, weatherMarkers, sectors,
    } = this.props;

    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    const darkMap = new googleMaps.StyledMapType(
      mapTheme,
      { name: 'Dark' },
    );

    // Create Google Map
    this.map = new googleMaps.Map(this.mapRef, {
      center: { lat, lng },
      zoom: zoomLevel,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'dark'],
      },
    });

    // Associate the styled map with the MapTypeId and set it to display.
    this.map.mapTypes.set('dark', darkMap);
    this.map.setMapTypeId('dark');

    // Create placeholder for markers
    this.markers = {
      shelters: [],
      weather: [],
      incidents: {},
    };

    this.infoWindows = {};

    // Create initial markers and sectors
    this.createSectors(sectors);
    this.createShelterMarkers(shelterMarkers);
    this.createWeatherMarkers(weatherMarkers);
    this.createIncidentMarkers(incidentMarkers);
  }

  /**
   * NOTE:
   * Only update map markers if the marker props have changed!
   * This will help to keep the performance good.
   */
  componentWillReceiveProps(nextProps) {
    const { weatherMarkers, incidentMarkers } = this.props;

    // TODO: Is there a better way to deep compare objects?
    const wPrev = JSON.stringify(weatherMarkers);
    const wNext = JSON.stringify(nextProps.weatherMarkers);

    if (wPrev !== wNext) {
      this.updateWeatherMarkers(nextProps.weatherMarkers);
    }
    if (nextProps.incidentMarkers.length !== incidentMarkers.length) {
      this.updateIncidentMarkers(nextProps.incidentMarkers);
    }
    if (nextProps.activeIncident) {
      setTimeout(
        () => this.openIncidentInfoWindow(nextProps.activeIncident.id),
        200
      );
    } else {
      this.closeIncidentInfoWindows();
    }
  }

  createSectors(sectors) {
    const { googleMaps } = this.props;

    sectors.forEach(({ coords, strokeColor, fillColor }) =>
      new googleMaps.Polygon({
        paths: coords,
        strokeColor: strokeColor || '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 1,
        fillColor: fillColor || '#FF0000',
        fillOpacity: 0.1,
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

      this.markers[type].push(marker);
    });
  }

  createShelterMarkers(markers) {
    this.createMarkers(markers, '/images/icons/shelter.png', 'shelters');
  }

  createWeatherMarkers(markers) {
    this.createMarkers(markers, null, 'weather');
  }

  createIncidentMarkers(markers) {
    const { googleMaps } = this.props;

    markers.forEach(({ title, position, id }) => {
      const marker = new googleMaps.Marker({
        position,
        title,
        map: this.map,
        animation: googleMaps.Animation.DROP,
        icon: '/images/icons/pin.png',
      });

      const infoWindow = new googleMaps.InfoWindow({
        content: title,
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.infoWindows[id] = { infoWindow };
      this.markers.incidents[id] = marker;
    });
  }

  updateWeatherMarkers(markers) {
    this.markers.weather.forEach(m => m.setMap(null));
    this.markers.weather = [];
    this.createWeatherMarkers(markers);
  }

  updateIncidentMarkers(markers) {
    // TODO: rethink this method...
    Object.values(this.markers.incidents).forEach(m => m.setMap(null));
    this.markers.incidents = {};
    this.createIncidentMarkers(markers);
  }

  openIncidentInfoWindow(id) {
    const marker = this.markers.incidents[id];
    this.infoWindows[id].infoWindow.open(this.map, marker);
  }

  closeIncidentInfoWindows() {
    Object.values(this.infoWindows).forEach(
      ({ infoWindow }) => infoWindow.close()
    );
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

export default CSSModules(MapView, styles);
