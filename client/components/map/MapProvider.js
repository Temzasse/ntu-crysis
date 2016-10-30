import React, { Component, PropTypes } from 'react';
import { mapTheme2 } from '../../static/dummyData';

// Components
import LoadingIndicator from '../utils/LoadingIndicator';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoomLevel: PropTypes.number,
};

const MAP_MAX_TIMEOUT = 1000 * 20; // 20 sec

class MapProvider extends Component {
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

  isMapLoaded() {
    if (window.google) {
      clearInterval(this.mapApiLoadInterval);

      const { lat, lng, zoomLevel } = this.props;

      const darkMap = new window.google.maps.StyledMapType(
        mapTheme2,
        { name: 'Dark' },
      );

      // Create Google Map
      const map = new window.google.maps.Map(this.mapRef, {
        center: { lat, lng },
        zoom: zoomLevel,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'dark'],
        },
      });

      // Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('dark', darkMap);
      map.setMapTypeId('dark');

      // Save map object to state and flip loading flag
      this.setState({
        googleMaps: window.google.maps,
        mapRef: map,
        mapApiLoaded: true,
      });
    } else if (this.mapLoadingCounter > MAP_MAX_TIMEOUT) {
      clearInterval(this.mapApiLoadInterval);
      console.debug('[MapContainer] Map failed to load!');
    } else {
      // TODO: handle map loading error...
      console.debug('[MapContainer] Still loading map...');
    }
    this.mapLoadingCounter += 100; // inc 100ms
  }

  render() {
    const { children } = this.props;
    const { mapApiLoaded, googleMaps, mapRef } = this.state;

    return (
      <div className='MapProvider' style={{ width: '100%', height: '100%' }}>
        {(mapApiLoaded && googleMaps && mapRef) ?
          // Provide Google Maps and reference to map node to child components
          React.Children.map(children,
            (child) => React.cloneElement(child, { googleMaps, mapRef })
          ) :
          <LoadingIndicator />
        }
        <div
          className='map'
          ref={ref => { this.mapRef = ref; }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

}

MapProvider.propTypes = propTypes;
MapProvider.defaultProps = {
  lat: 1.30,
  lng: 103.84,
  zoomLevel: 11,
};
export default MapProvider;
