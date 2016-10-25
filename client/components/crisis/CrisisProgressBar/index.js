import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

const CrisisProgressBar = ({ max = 1, current = 0 }) => {
  let barColor = '#51a351';

  if ((current / max) > (3 / 4)) {
    barColor = '#ffc04d';
  }

  if (max - current <= 0) {
    barColor = '#ec3232';
  }

  const barStyles = {
    width: `calc(${100 * (current / max)}%)`,
    backgroundColor: barColor,
  };

  return (
    <div styleName='CrisisProgressBar'>
      <div
        styleName='bar'
        style={barStyles}
      />
      <span styleName='current'>{current}</span>
      <span styleName='max'>{max}</span>
    </div>
  );
};

CrisisProgressBar.propTypes = propTypes;
export default CSSModules(CrisisProgressBar, styles);
