import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BrowserRouter from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

// Actions
import { startInit } from '../actions/index.actions';

// Components
import NavigationContainer from '../components/navigation/NavigationContainer';
import Dashboard from './Dashboard';
import NoMatchPage from './NoMatchPage';
import Login from './Login';
import ReportIncidentPage from './ReportIncidentPage';
import ResponseUnitPage from './ResponseUnitPage';
import Archives from './Archives';
import PublicMap from './PublicMap';

const propTypes = {
  startInit: PropTypes.func.isRequired,
  initCompleted: PropTypes.bool.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.startInit();
  }

  render() {
    const { initCompleted } = this.props;

    return (
      <div>
        {initCompleted ?
          <BrowserRouter>
            <div>
              <NavigationContainer />

              {/* eslint-disable max-len */}
              <Match exactly pattern='/' component={Dashboard} />
              <Match pattern='/login' component={Login} />
              <Match pattern='/report-incident' component={ReportIncidentPage} />
              <Match pattern='/responseunit' component={ResponseUnitPage} />
              <Match pattern='/archives' component={Archives} />
              <Match pattern='/map' component={PublicMap} />
              <Miss component={NoMatchPage} />
              {/* eslint-enable max-len */}

            </div>
          </BrowserRouter> :
          <div>Loading...</div>
        }
      </div>
    );
  }
}

App.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    initCompleted: state.appInit.complete,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startInit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
