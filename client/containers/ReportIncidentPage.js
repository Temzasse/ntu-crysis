import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Redirect from 'react-router/Redirect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* eslint-disable max-len */
// Component imports
import FlexLayout from '../components/layout/FlexLayout';
import MainPanel from '../components/layout/MainPanel';
import MapProvider from '../components/map/MapProvider';
import CoordinatePicker from '../components/map/CoordinatePicker';
import ReportIncidentForm from '../components/incident/ReportIncidentForm';
/* eslint-enable max-len */


const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
};

class ReportIncidentPage extends Component {
  constructor(props) {
    super(props);
    this.updateLatLng = this.updateLatLng.bind(this);

    this.state = {
      userIsAuthenticated: false,
      lat: 0,
      lng: 0,
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

  updateLatLng({ lat, lng }) {
    this.setState({ lat: lat(), lng: lng() });
  }

  render() {
    const { userIsAuthenticated, lat, lng } = this.state;

    if (!userIsAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <FlexLayout direction='row'>
        <ReportIncidentForm
          lat={lat}
          lng={lng}
        />
        <MainPanel>
          <MapProvider>
            <CoordinatePicker onClick={this.updateLatLng} />
          </MapProvider>
        </MainPanel>
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
