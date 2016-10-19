import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Redirect from 'react-router/Redirect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import {
  removeMessage,
  toggleMarkerVisibility,
  fetchIncidents,
} from '../actions/index.actions';


/* eslint-disable max-len */

// Component imports
import MapContainer from '../components/map/MapContainer';
import Toolbar from '../components/map/Toolbar';
import FlexLayout from '../components/layout/FlexLayout';
import MainPanel from '../components/layout/MainPanel';
import Sidebar from '../components/layout/Sidebar';
import IncidentDetailsContainer from '../components/incident/IncidentDetailsContainer';
import IncidentListContainer from '../components/incident/IncidentListContainer';
import Toast from '../components/utils/Toast';

/* eslint-enable max-len */

const propTypes = {
  selectedIncident: PropTypes.object,
  removeMessage: PropTypes.func.isRequired,
  fetchIncidents: PropTypes.func.isRequired,
  toggleMarkerVisibility: PropTypes.func.isRequired,
  toastMessages: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  controlMap: PropTypes.object.isRequired,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsAuthenticated: false,
    };
  }

  componentWillMount() {
    const { loggedIn, currentUser } = this.props;

    // Don't require login when developing
    // const isDev = process.env.DEBUG;

    if (loggedIn) {
      if (currentUser.role === 'operator') {
        this.props.fetchIncidents();
        this.setState({ userIsAuthenticated: true });
      }
    }
    // else if (isDev) { // NOTE: This part is only for development
    //   this.props.fetchIncidents();
    //   this.setState({ userIsAuthenticated: true });
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { toastMessages, selectedIncident, controlMap } = this.props;
    const { userIsAuthenticated } = this.state;

    if (!userIsAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div className='Dashboard'>

        <Toast
          messages={toastMessages}
          removeToastMsg={this.props.removeMessage}
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
              <Toolbar
                toggleMarkerVisibility={this.props.toggleMarkerVisibility}
                controlMap={controlMap}
              />
            </FlexLayout>
          </MainPanel>

        </FlexLayout>»
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    selectedIncident: state.incident.selected,
    toastMessages: state.messages,
    currentUser: state.user.user,
    loggedIn: state.user.loggedIn,
    controlMap: state.controlMap,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeMessage,
    toggleMarkerVisibility,
    fetchIncidents,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
