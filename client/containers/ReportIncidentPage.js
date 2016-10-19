import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Redirect from 'react-router/Redirect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* eslint-disable max-len */
// Component imports
import FlexLayout from '../components/layout/FlexLayout';
// import Toast from '../components/utils/Toast';
// import LoginContainer from '../components/login/LoginContainer';
// import callcenter from './CallCenter';
import MapContainer from '../components/map/MapContainer';
import ReportIncidentForm from '../components/incident/ReportIncidentForm';
/* eslint-enable max-len */

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
};

class ReportIncidentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsAuthenticated: false,
    };
  }

  componentWillMount() {
    const { loggedIn, currentUser } = this.props;

    // Don't require login when developing
    const isDev = process.env.DEBUG;

    if (loggedIn) {
      if (currentUser.role === 'callcenter'
      || currentUser.role === 'operator') {
        this.setState({ userIsAuthenticated: true });
      }
    } else if (isDev) { // NOTE: This part is only for development
      this.setState({ userIsAuthenticated: true });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { userIsAuthenticated } = this.state;

    if (!userIsAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <FlexLayout direction='row'>
        <ReportIncidentForm />
        <MapContainer />
      </FlexLayout>
    );
  }
}

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
