import React from 'react';
import BrowserRouter from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

// Components
import NavigationContainer from '../components/navigation/NavigationContainer';
import Dashboard from './Dashboard';
import NoMatchPage from './NoMatchPage';
import Login from './Login';
import CallCenter from './CallCenter';
import ReportIncidentPage from './ReportIncidentPage';

const App = () => (
  <BrowserRouter>
    <div>
      <NavigationContainer />

      {/*
        -- First level routes here --

        NOTE: routes can now be easily nested by adding Match components
        to inner UI components (eg: https://react-router.now.sh/recursive-paths)
        */}
      <Match exactly pattern='/' component={Dashboard} />
      <Match pattern='/login' component={Login} />
      <Match pattern='/callcenter' component={CallCenter} />
      <Match pattern='/report-incident' component={ReportIncidentPage} />
      <Match pattern='/uber' render={() => <div>uber page</div>} />
      <Match pattern='/awesome' render={() => <div>awesome</div>} />
      <Miss component={NoMatchPage} />

    </div>
  </BrowserRouter>
);

export default App;
