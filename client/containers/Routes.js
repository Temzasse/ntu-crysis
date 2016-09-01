import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Containers
import App from './App';
import LandingPage from './LandingPage';
import NoMatchPage from './NoMatchPage';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={LandingPage} />
        <Route path='*' component={NoMatchPage} />
      </Route>
    </Router>
  );
};

export default Routes;
