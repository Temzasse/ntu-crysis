import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherData } from '../../actions/index.actions';

// Components
import LoadingIndicator from '../utils/LoadingIndicator';
import MapView from './MapView';

const propTypes = {
  fetchWeatherData: PropTypes.func.isRequired,
};

const MAP_MAX_TIMEOUT = 20 * 60;
const WEATHER_UPDATE_INTERVAL = 2 * 60 * 60 * 1000; // 2h
// const WEATHER_UPDATE_INTERVAL = 20000; // 20sec for testing

class MapContainer extends Component {
  constructor(props) {
    super(props);

    // Bind `this` to components class methods
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
      console.debug('[MapContainer] Cleared map loading interval');

      // Save map object to state and flip loading flag
      this.setState({ googleMaps: window.google.maps, mapApiLoaded: true });

      // Fetch the first set of weather data
      console.debug('[MapContainer] Fetching weather data...');
      this.props.fetchWeatherData();

      // Start weather loading interval
      this.weatherIntervalId = window.setInterval(() => {
        console.debug('[MapContainer] Fetching weather data...');
        this.props.fetchWeatherData();
      }, WEATHER_UPDATE_INTERVAL);
    } else if (this.mapLoadingCounter > MAP_MAX_TIMEOUT) {
      clearInterval(this.mapApiLoadInterval);
      console.debug('[MapContainer] Map failed to load!');

      // TODO: handle map loading error...
    } else console.debug('[MapContainer] Still loading map...');

    this.mapLoadingCounter++; // increment loading checker counter
  }

  render() {
    const { mapApiLoaded, googleMaps } = this.state;

    const sectors = [
      {
        fillColor: '#33cc33',
        strokeColor: '#006633',
        coords: [ // top right
          { lat: 1.349820, lng: 103.842773 },
          { lat: 1.472692, lng: 103.840714 },
          { lat: 1.436312, lng: 103.882599 },
          { lat: 1.434253, lng: 103.932037 },
          { lat: 1.423270, lng: 103.998642 },
          { lat: 1.448668, lng: 104.039154 },
          { lat: 1.433566, lng: 104.076920 },
          { lat: 1.406109, lng: 104.093399 },
          { lat: 1.350507, lng: 104.078979 },
        ],
      },
      {
        fillColor: '#ff80ff',
        strokeColor: '#b300b3',
        coords: [ // down right
          { lat: 1.348447, lng: 103.842773 },
          { lat: 1.196736, lng: 103.844833 },
          { lat: 1.276368, lng: 104.078979 },
          { lat: 1.349820, lng: 104.078979 },
        ],
      },
      {
        fillColor: '#ffff00',
        strokeColor: '#999900',
        coords: [ // top left
          { lat: 1.349820, lng: 103.841400 },
          { lat: 1.472692, lng: 103.839340 },
          { lat: 1.480243, lng: 103.806381 },
          { lat: 1.455532, lng: 103.768616 },
          { lat: 1.450727, lng: 103.745956 },
          { lat: 1.461023, lng: 103.725357 },
          { lat: 1.450040, lng: 103.699265 },
          { lat: 1.432193, lng: 103.674545 },
          { lat: 1.351193, lng: 103.631973 },
        ],
      },
      {
        fillColor: '#3366ff',
        strokeColor: '#002699',
        coords: [ // down left
          { lat: 1.348447, lng: 103.841400 },
          { lat: 1.195363, lng: 103.844147 },
          { lat: 1.121221, lng: 103.645020 },
          { lat: 1.209093, lng: 103.598328 },
          { lat: 1.277055, lng: 103.600388 },
          { lat: 1.323735, lng: 103.615494 },
          { lat: 1.349820, lng: 103.631287 },
        ],
      },
    ];

    // Hardcoded shelter data
    const markers = [
      {
        position: { lat: 1.30863255, lng: 103.85444641 },
        title: 'Shelter 1',
      },
      {
        position: { lat: 1.3669815, lng: 103.92757416 },
        title: 'Shelter 2',
      },
      {
        position: { lat: 1.39821478, lng: 103.75831604 },
        title: 'Shelter 3',
      },
      {
        position: { lat: 1.31378104, lng: 103.67385864 },
        title: 'Shelter 4',
      },
    ];

    return (
      <div className='MapContainer' style={{ width: '100%' }}>
        {!mapApiLoaded ?
          <LoadingIndicator /> :
          <MapView
            googleMaps={googleMaps}
            markers={markers}
            sectors={sectors}
          />
        }
      </div>
    );
  }

}

MapContainer.propTypes = propTypes;
// MapContainer.defaultProps = {};

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchWeatherData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
