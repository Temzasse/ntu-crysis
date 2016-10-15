import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  removeMessage,
  toggleMarkerVisibility,
} from '../actions/index.actions';

/* eslint-disable max-len */
// Component imports
import MapContainer from '../components/map/MapContainer';
import FlexLayout from '../components/layout/FlexLayout';
import MainPanel from '../components/layout/MainPanel';
import Sidebar from '../components/layout/Sidebar';
import IncidentDetailsContainer from '../components/incident/IncidentDetailsContainer';
import IncidentListContainer from '../components/incident/IncidentListContainer';
import Toast from '../components/utils/Toast';
/* eslint-enable max-len */

const propTypes = {
  selectedIncident: PropTypes.object,
  rmMessage: PropTypes.func.isRequired,
  toastMessages: PropTypes.array.isRequired,
};

const Dashboard = ({ selectedIncident, toastMessages, rmMessage }) => (
  <div className='Dashboard'>

    <Toast
      messages={toastMessages}
      removeToastMsg={rmMessage}
    />

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
          <div>Toolbar here</div>
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
    toastMessages: state.messages,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    rmMessage: removeMessage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
