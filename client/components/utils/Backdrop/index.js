import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  onClick: PropTypes.function,
  zIndex: PropTypes.number,
};

const Backdrop = ({ onClick, zIndex }) => (
  <div styleName='Backdrop' onClick={onClick} style={{ zIndex }} />
);

Backdrop.propTypes = propTypes;

Backdrop.defaultProps = {
  onClick: () => { console.log('Backdrop clicked'); },
  zIndex: 999,
};

export default CSSModules(Backdrop, styles);
