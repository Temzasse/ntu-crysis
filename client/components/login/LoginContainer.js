import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogin } from '../../actions/index.actions';

// components
import LoginForm from './LoginForm';

const propTypes = {
  doLogin: PropTypes.func.isRequired,
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleUsername(username) {
    console.log('Username', username);
    this.setState({ username });
  }

  handlePassword(password) {
    console.log('Password', password);
    this.setState({ password });
  }

  handleSubmit() {
    console.log('BOOM', this.state);
    this.props.doLogin(this.state);
  }

  render() {
    return (
      <div className='LoginContainer'>
        <LoginForm
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

LoginContainer.propTypes = propTypes;

// LoginContainer.defaultProps = {};

// export default LoginContainer;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    incidents: state.incident.all,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doLogin,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LoginContainer);
