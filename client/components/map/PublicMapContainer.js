import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Selectors
import { getIncidentMarkers } from '../../selectors';

// Components
import Marker from './Marker';

const propTypes = {
  incidentMarkers: PropTypes.array,
  shelterMarkers: PropTypes.array.isRequired,
  googleMaps: PropTypes.object,
  mapRef: PropTypes.object,
};

const PublicMapContainer = ({
  incidentMarkers, shelterMarkers, googleMaps, mapRef,
}) => (
  <div className='PublicMapContainer' style={{ width: '100%' }}>

    {incidentMarkers.map(m =>
      <Marker
        marker={m}
        markerAnimation='drop'
        googleMaps={googleMaps}
        mapRef={mapRef}
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

  </div>
);

PublicMapContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    loading: state.loading,
    incidentMarkers: getIncidentMarkers(state),
    shelterMarkers: state.controlMap.markers.shelters,
  };
}

export default connect(mapStateToProps)(PublicMapContainer);
