import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actions from '../actions/index.actions';


// Components
import NavigationContainer from '../components/navigation/NavigationContainer';

const propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

const App = ({ children }) => {
  return (
    <div className='App' style={{ width: '100%' }}>
      <NavigationContainer />
      {children}
    </div>
  );
};

App.propTypes = propTypes;

export default App;
