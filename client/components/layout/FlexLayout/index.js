import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  children: PropTypes.array,
  direction: PropTypes.oneOf(['row', 'column']),
};

const FlexLayout = ({ children, direction }) => (
  <div
    styleName='FlexLayout'
    style={{ flexDirection: direction === 'row' ? 'row' : 'column' }}
  >
    {children}
  </div>
);

FlexLayout.propTypes = propTypes;
FlexLayout.defaultProps = {
  direction: 'row',
};

export default CSSModules(FlexLayout, styles); // { allowMultiple: true }
