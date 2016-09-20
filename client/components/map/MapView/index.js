import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  googleMaps: PropTypes.object.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoomLevel: PropTypes.number,
  markers: PropTypes.arrayOf(PropTypes.shape({
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
    const { googleMaps, lat, lng, zoomLevel, markers, sectors } = this.props;

    // render Google Map
    this.map = new googleMaps.Map(this.mapRef, {
      center: { lat, lng },
      zoom: zoomLevel,
    });

    this.createSectors(sectors);
    this.createMarkers(markers);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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

  createMarkers(markers) {
    const { googleMaps } = this.props;

    markers.forEach(({ title, position }) => {
      const marker = new googleMaps.Marker({
        position,
        title,
        map: this.map,
        animation: googleMaps.Animation.DROP,
        icon: '/images/crysis-logo-marker.png',
      });

      const infoWindow = new googleMaps.InfoWindow({
        content: title,
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });
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
