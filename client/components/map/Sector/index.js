import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const propTypes = {
  sector: PropTypes.object,
  googleMaps: PropTypes.object,
  mapRef: PropTypes.object,
};

class Sector extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { googleMaps, mapRef, sector } = this.props;

    this.sector = new googleMaps.Polygon({
      paths: sector.coords,
      strokeColor: sector.strokeColor || '#FF0000',
      strokeOpacity: 0.6,
      strokeWeight: 1,
      fillColor: sector.fillColor || '#FF0000',
      fillOpacity: 0.1,
      map: mapRef,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className='Sector' />
    );
  }
}

Sector.propTypes = propTypes;
export default Sector;
