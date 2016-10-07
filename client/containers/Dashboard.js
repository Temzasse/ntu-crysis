import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* eslint-disable max-len */
// Component imports
import MapContainer from '../components/map/MapContainer';
import FlexLayout from '../components/layout/FlexLayout';
import MainPanel from '../components/layout/MainPanel';
import Sidebar from '../components/layout/Sidebar';
import IncidentDetailsContainer from '../components/incident/IncidentDetailsContainer';
import IncidentListContainer from '../components/incident/IncidentListContainer';
/* eslint-enable max-len */

const propTypes = {
  selectedIncident: PropTypes.object,
};

const Dashboard = ({ selectedIncident }) => (
  <div className='Dashboard'>
    <FlexLayout direction='row'>

      <Sidebar
        leftPanelComponent={IncidentListContainer}
        rightPanelComponent={IncidentDetailsContainer}
        visiblePanel={selectedIncident ? 'right' : 'left'}
      />

      <MainPanel>
        <FlexLayout direction='column'>
          <div>Crisis situation progress bar here...</div>
          <MapContainer />
          <div>Map filter buttons here. Or reporting related stuff...</div>
        </FlexLayout>
      </MainPanel>

    </FlexLayout>
  </div>
);

Dashboard.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    selectedIncident: state.incident.selected,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard);
