import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <App />
      {!window.devToolsExtension ? <DevTools /> : null}
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
