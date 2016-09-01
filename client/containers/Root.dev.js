import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import Routes from './Routes';

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <div>
        <Routes />
        {!window.devToolsExtension ? <DevTools /> : null}
      </div>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
