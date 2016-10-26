import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const propTypes = {
  googleMaps: PropTypes.object,
  mapRef: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

class CoordinatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { googleMaps, mapRef } = this.props;
    googleMaps.event.addListener(mapRef, 'click', this.handleClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClick(evnt) {
    const { googleMaps, mapRef, onClick } = this.props;

    // Remove old marker
    if (this.marker) this.marker.setMap(null);

    // Add new marker
    this.marker = new googleMaps.Marker({
      position: {
        lat: evnt.latLng.lat(),
        lng: evnt.latLng.lng(),
      },
      title: 'New incident',
      map: mapRef,
      animation: googleMaps.Animation.DROP,
    });

    // Call onClick handler prop
    onClick(evnt.latLng);
  }

  render() {
    return (
      <div className='CoordinatePicker' />
    );
  }

}

CoordinatePicker.propTypes = propTypes;
export default CoordinatePicker;
