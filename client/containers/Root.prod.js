import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <div>
        <Routes />
      </div>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
