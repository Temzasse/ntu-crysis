import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const propTypes = {
  marker: PropTypes.object,
  googleMaps: PropTypes.object,
  mapRef: PropTypes.object,
  showInfoWindow: PropTypes.bool,
  markerIcon: PropTypes.string,
  markerLabel: PropTypes.string,
  markerAnimation: PropTypes.string,
};

class Marker extends Component {
  constructor(props) {
    super(props);

    this.infoWindow = null;
    this.marker = null;
  }

  componentWillMount() {
    const {
      googleMaps, mapRef, marker, markerIcon, markerLabel, markerAnimation,
    } = this.props;
    const { position, title } = marker;

    let animation;
    if (markerAnimation === 'drop') {
      animation = googleMaps.Animation.DROP;
    }
    if (markerAnimation === 'bounce') {
      animation = googleMaps.Animation.BOUNCE;
    }

    this.marker = new googleMaps.Marker({
      position,
      title,
      animation,
      label: markerLabel || '',
      icon: markerIcon,
      map: mapRef,
    });

    const infoWindow = new googleMaps.InfoWindow({
      content: title,
    });

    this.marker.addListener('click', () => {
      infoWindow.open(mapRef, this.marker);
    });

    this.infoWindow = infoWindow;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showInfoWindow && this.infoWindow) {
      this.infoWindow.open(this.props.mapRef, this.marker);
    } else if (!nextProps.showInfoWindow && this.infoWindow) {
      this.infoWindow.close();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    this.marker.setMap(null);
  }

  render() {
    return (
      <div className='Marker' />
    );
  }
}

Marker.propTypes = propTypes;
Marker.defaultProps = {
  showInfoWindow: false,
};

export default Marker;
