import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  something: PropTypes.object,
};

const Base = ({ something }) =>
  <div styleName='Base'>
    Base
    <div>{something}</div>
  </div>;

Base.propTypes = propTypes;

// Base.defaultProps = {};

export default CSSModules(Base, styles); // { allowMultiple: true }
