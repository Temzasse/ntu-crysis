import 'babel-polyfill'; // emulate ES6 features

import React from 'react';
import { render } from 'react-dom';

// app specific imports
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { websocket as ws } from './services';

const store = configureStore();

// Connect the websocket
ws.connect(store);

const rootElement = document.getElementById('root'); // where to mount on page

if (process.env.NODE_ENV === 'production') {
  render(<Root store={store} />, rootElement);
} else {
  // NOTE: Workaround for https://github.com/gaearon/react-hot-loader/pull/314
  const Redbox = require('redbox-react').default; // eslint-disable-line

  render(
    <AppContainer errorReporter={Redbox}>
      <Root store={store} />
    </AppContainer>,
    rootElement
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      // When using Webpack 2 in ES modules mode, you can
      // use <Root /> here rather than require() a <NextDevRoot />.
      const NextDevRoot = require('./containers/Root').default; // eslint-disable-line
      render(
        <AppContainer errorReporter={Redbox}>
          <NextDevRoot store={store} />
        </AppContainer>,
        rootElement
      );
    });
  }
}
