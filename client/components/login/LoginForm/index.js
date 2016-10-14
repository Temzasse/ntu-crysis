import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const LoginForm = ({ handleUsername, handlePassword, handleSubmit }) => (
  <div id='Test'>
    <div styleName='LoginForm'>
      <div styleName='LoginField'>
        <img src='/images/crysis-logo.png' alt='brand logo' height='40' />
        <br />
        <label>
          Username
          <input onChange={event => handleUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password
          <input onChange={event => handlePassword(event.target.value)} />
        </label>
        <br />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  </div>
);

LoginForm.propTypes = propTypes;
// LoginForm.defaultProps = {};

export default CSSModules(LoginForm, styles); // { allowMultiple: true }
