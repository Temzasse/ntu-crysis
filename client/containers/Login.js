import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';


// Component imports
import LoginContainer from '../components/login/LoginContainer';


const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
};

const Login = ({ currentUser, loggedIn }) => {
  if (loggedIn) {
    if (currentUser.role === 'operator') return <Redirect to='/' />;
    if (currentUser.role === 'callcentre') return <Redirect to='/callcentre' />;
    if (currentUser.role === 'response') return <Redirect to='/response' />;
  }
  return (
    <div className='Login'>
      <LoginContainer />
    </div>
  );
};

Login.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    currentUser: state.user.user,
    loggedIn: state.user.loggedIn,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
