import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherData } from '../../actions/index.actions';
import weatherIcons from '../../static/weatherIcons';

// Selectors
import {
  getIncidentMarkers, getWeatherMarkers, getActiveIncident,
} from '../../selectors';

// Components
import Sector from './Sector';
import Marker from './Marker';

const propTypes = {
  fetchWeatherData: PropTypes.func.isRequired,
  weatherMarkers: PropTypes.array,
  incidentMarkers: PropTypes.array,
  shelterMarkers: PropTypes.array.isRequired,
  mapSectors: PropTypes.array.isRequired,
  markerVisibility: PropTypes.object.isRequired,
  activeIncident: PropTypes.object,
  googleMaps: PropTypes.object,
  mapRef: PropTypes.object,
};

const WEATHER_UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2h

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Fetch the first set of weather data
    this.props.fetchWeatherData();

    // Start weather loading interval
    this.weatherIntervalId = window.setInterval(
      this.props.fetchWeatherData, WEATHER_UPDATE_INTERVAL
    );
  }

  getWeatherIcon(weatherData) {
    return weatherIcons[weatherData.abbrev] ||
      '/images/icons/weather/white/nil.png';
  }

  render() {
    const {
      incidentMarkers, weatherMarkers, shelterMarkers,
      mapSectors, googleMaps, mapRef, markerVisibility, activeIncident,
    } = this.props;

    // Show / hide weather markers based on their visibility on the map
    const wMarkers = markerVisibility.weather ? weatherMarkers : [];
    const activeIncidentId = activeIncident ? activeIncident.id : null;

    return (
      <div className='MapContainer' style={{ width: '100%' }}>

        {mapSectors.map((s, i) =>
          <Sector
            sector={s}
            googleMaps={googleMaps}
            mapRef={mapRef}
            key={i}
          />
        )}

        {incidentMarkers.map(m =>
          <Marker
            marker={m}
            markerAnimation='drop'
            googleMaps={googleMaps}
            mapRef={mapRef}
            showInfoWindow={m.id === activeIncidentId}
            key={m.title}
          />
        )}

        {shelterMarkers.map(m =>
          <Marker
            marker={m}
            markerIcon={'/images/icons/shelter.png'}
            googleMaps={googleMaps}
            mapRef={mapRef}
            key={m.title}
          />
        )}

        {wMarkers.map(m =>
          <Marker
            marker={m}
            markerIcon={this.getWeatherIcon(m)}
            googleMaps={googleMaps}
            mapRef={mapRef}
            key={m.title}
          />
        )}

      </div>
    );
  }
}

MapContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    loading: state.loading,
    shelterMarkers: state.controlMap.markers.shelters,
    mapSectors: state.controlMap.sectors,
    markerVisibility: state.controlMap.visibility,
    weatherMarkers: getWeatherMarkers(state),
    incidentMarkers: getIncidentMarkers(state),
    activeIncident: getActiveIncident(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchWeatherData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
