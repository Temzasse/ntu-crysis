import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

// Components
import NavigationContainer from '../components/navigation/NavigationContainer';
import LandingPage from './LandingPage';
import NoMatchPage from './NoMatchPage';

const App = () => (
  <BrowserRouter>
    <div>
      <NavigationContainer />

      {/*
        -- First level routes here --

        NOTE: routes can now be easily nested by adding Match components
        to inner UI components (eg: https://react-router.now.sh/recursive-paths)
        */}
      <Match exactly pattern='/' component={LandingPage} />
      <Match pattern='/uber' render={() => <div>uber page</div>} />
      <Match pattern='/awesome' render={() => <div>awesome</div>} />
      <Miss component={NoMatchPage} />

    </div>
  </BrowserRouter>
);

export default App;
