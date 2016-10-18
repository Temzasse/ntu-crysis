import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Redirect } from 'react-router';

/* eslint-disable max-len */
// Component imports
import FlexLayout from '../components/layout/FlexLayout';
// import Toast from '../components/utils/Toast';
// import LoginContainer from '../components/login/LoginContainer';
// import callcenter from './CallCenter';
import MapContainer from '../components/map/MapContainer';
import ReportIncidentContainer from '../components/incident/ReportIncidentContainer';
/* eslint-enable max-len */

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const ReportIncidentPage = () => {
  return (
    <FlexLayout direction='row'>
      <ReportIncidentContainer />
      <MapContainer />
    </FlexLayout>
  );
};

ReportIncidentPage.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    currentUser: state.user.user,
    loggedIn: state.user.loggedIn,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportIncidentPage);
