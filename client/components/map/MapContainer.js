import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherData } from '../../actions/index.actions';
import { getIncidentMarkers, getWeatherMarkers } from '../../selectors';

// Components
import LoadingIndicator from '../utils/LoadingIndicator';
import MapView from './MapView';

const propTypes = {
  fetchWeatherData: PropTypes.func.isRequired,
  weatherMarkers: PropTypes.array,
  incidentMarkers: PropTypes.array,
  shelterMarkers: PropTypes.array.isRequired,
  mapSectors: PropTypes.array.isRequired,
  markerVisibility: PropTypes.object.isRequired,
};

const MAP_MAX_TIMEOUT = 20 * 60;
const WEATHER_UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2h
// const WEATHER_UPDATE_INTERVAL = 10000; // 10sec for testing


class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.isMapLoaded = this.isMapLoaded.bind(this);

    // Not in state because we dont want re-render each time counter increments
    this.mapLoadingCounter = 0;

    this.state = {
      mapApiLoaded: false,
      googleMaps: null,
    };
  }

  componentDidMount() {
    // Start checker for Google Map API loading
    this.mapApiLoadInterval = window.setInterval(this.isMapLoaded, 100);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  isMapLoaded() {
    if (window.google) {
      clearInterval(this.mapApiLoadInterval);

      // Save map object to state and flip loading flag
      this.setState({
        googleMaps: window.google.maps,
        mapApiLoaded: true,
      });

      // TODO: Uncomment below. Disabled featching weather temporarily...
      // Fetch the first set of weather data
      // this.props.fetchWeatherData();

      // Start weather loading interval
      this.weatherIntervalId = window.setInterval(
        () => console.debug('FETCH WEATHER DATA'), WEATHER_UPDATE_INTERVAL
      );
      // this.weatherIntervalId = window.setInterval(
      //   this.props.fetchWeatherData, WEATHER_UPDATE_INTERVAL
      // );
    } else if (this.mapLoadingCounter > MAP_MAX_TIMEOUT) {
      clearInterval(this.mapApiLoadInterval);
      console.debug('[MapContainer] Map failed to load!');
    } else {
      // TODO: handle map loading error...
      console.debug('[MapContainer] Still loading map...');
    }
    this.mapLoadingCounter++;
  }

  render() {
    const {
      incidentMarkers,
      weatherMarkers,
      shelterMarkers,
      mapSectors,
    } = this.props;

    const { mapApiLoaded, googleMaps } = this.state;
    const { markerVisibility } = this.props;

    // Show / hide weather markers based on their visibility on the map
    const wMarkers = markerVisibility.weather ? weatherMarkers : [];

    return (
      <div className='MapContainer' style={{ width: '100%' }}>
        {!mapApiLoaded ?
          <LoadingIndicator /> :
          <MapView
            googleMaps={googleMaps}
            shelterMarkers={shelterMarkers}
            weatherMarkers={wMarkers}
            incidentMarkers={incidentMarkers}
            sectors={mapSectors}
          />
        }
      </div>
    );
  }

}

MapContainer.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    loading: state.loading,
    shelterMarkers: state.controlMap.markers.shelters,
    mapSectors: state.controlMap.sectors,
    markerVisibility: state.controlMap.visibility,
    weatherMarkers: getWeatherMarkers(state),
    incidentMarkers: getIncidentMarkers(state),
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchWeatherData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
