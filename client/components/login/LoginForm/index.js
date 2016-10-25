import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogin } from '../../../actions/index.actions';

// Styles
import styles from './index.scss';

const propTypes = {
  doLogin: PropTypes.func.isRequired,
};

class LoginForm extends Component {
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
    this.setState({ username });
  }

  handlePassword(password) {
    this.setState({ password });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username.lenght && this.state.password.lenght) {
      this.props.doLogin(this.state);
    }
  }

  render() {
    const { username, password } = this.state;
    const submitDisabled = !username || !password;

    return (
      <div styleName='LoginForm'>
        <div styleName='logo-wrapper'>
          <img src='images/crysis-logo.png' alt='brand logo' height='100' />
        </div>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>
            Username
            <input
              onChange={event => this.handleUsername(event.target.value)}
              name='username'
            />
          </label>
          <label htmlFor='password'>
            Password
            <input
              onChange={event => this.handlePassword(event.target.value)}
              name='password'
              type='password'
            />
          </label>
          <hr />
          <button type='submit' disabled={submitDisabled}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;

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
)(CSSModules(LoginForm, styles));
