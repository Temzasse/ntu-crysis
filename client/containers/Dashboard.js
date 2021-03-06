import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Redirect from 'react-router/Redirect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSelectedIncident, getIncidentsArray } from '../selectors';

// Actions
import {
  removeMessage,
  toggleMarkerVisibility,
  fetchIncidents,
  fetchCurrentCrisis,
  fetchResponseUnits,
  archiveCurrentCrisis,
} from '../actions/index.actions';


/* eslint-disable max-len */

// Component imports
import MapContainer from '../components/map/MapContainer';
import MapProvider from '../components/map/MapProvider';
import CrisisProgressBar from '../components/crisis/CrisisProgressBar';
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
  allIncidents: PropTypes.array.isRequired,
  removeMessage: PropTypes.func.isRequired,
  fetchIncidents: PropTypes.func.isRequired,
  fetchCurrentCrisis: PropTypes.func.isRequired,
  fetchResponseUnits: PropTypes.func.isRequired,
  toggleMarkerVisibility: PropTypes.func.isRequired,
  archiveCurrentCrisis: PropTypes.func.isRequired,
  toastMessages: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  controlMap: PropTypes.object.isRequired,
  currentCrisis: PropTypes.object,
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
        this.props.fetchCurrentCrisis();
        this.props.fetchIncidents();
        this.props.fetchResponseUnits();
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
    const { userIsAuthenticated } = this.state;
    const {
      toastMessages, selectedIncident, controlMap, currentCrisis, allIncidents,
    } = this.props;

    if (!userIsAuthenticated) {
      return <Redirect to='/login' />;
    }

    const disableArchiving = !!allIncidents.filter(i => !i.resolved).length;

    return (
      <div className='Dashboard'>

        <Toast
          messages={toastMessages}
          removeToastMsg={this.props.removeMessage}
        />

        {!!currentCrisis &&
          <FlexLayout direction='row'>

            <Sidebar
              leftPanelComponent={IncidentListContainer}
              rightPanelComponent={IncidentDetailsContainer}
              visiblePanel={selectedIncident ? 'right' : 'left'}
            />

            <MainPanel>
              <FlexLayout direction='column'>
                <CrisisProgressBar
                  current={allIncidents.length}
                  max={currentCrisis.threshold}
                />
                <div style={{ flex: 1 }}>
                  <MapProvider>
                    <MapContainer />
                  </MapProvider>
                </div>
                <Toolbar
                  toggleMarkerVisibility={this.props.toggleMarkerVisibility}
                  archiveCurrentCrisis={this.props.archiveCurrentCrisis}
                  disableArchiving={disableArchiving}
                  controlMap={controlMap}
                />
              </FlexLayout>
            </MainPanel>

          </FlexLayout>
        }
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    selectedIncident: getSelectedIncident(state),
    allIncidents: getIncidentsArray(state),
    toastMessages: state.messages,
    currentUser: state.user.user,
    loggedIn: state.user.loggedIn,
    controlMap: state.controlMap,
    currentCrisis: state.crisis.current,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeMessage,
    toggleMarkerVisibility,
    fetchIncidents,
    fetchCurrentCrisis,
    fetchResponseUnits,
    archiveCurrentCrisis,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
