import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  color: PropTypes.string,
};

const LoadingIndicator = ({ color }) => {
  return (
    <div styleName='la-ball-clip-rotate-multiple' style={{ color }}>
      <div />
      <div />
    </div>
  );
};

LoadingIndicator.propTypes = propTypes;
LoadingIndicator.defaultProps = {
  color: '#29384F',
};

export default CSSModules(LoadingIndicator, styles); // { allowMultiple: true }
