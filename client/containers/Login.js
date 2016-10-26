import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';


// Component imports
import LoginForm from '../components/login/LoginForm';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
};

const Login = ({ currentUser, loggedIn }) => {
  if (loggedIn) {
    if (currentUser.role === 'operator') {
      return <Redirect to='/' />;
    }
    if (currentUser.role === 'callcenter') {
      return <Redirect to='/callcenter' />;
    }
    if (currentUser.role === 'responseunit') {
      return <Redirect to='/responseunit' />;
    }
  }
  return (
    <div className='Login'>
      <LoginForm />
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
