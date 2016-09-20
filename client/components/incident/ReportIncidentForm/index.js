import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  something: PropTypes.object,
};

class Base extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div styleName='Base'>
        Base
      </div>
    );
  }

}

Base.propTypes = propTypes;

// Base.defaultProps = {};

export default CSSModules(Base, styles); // { allowMultiple: true }
