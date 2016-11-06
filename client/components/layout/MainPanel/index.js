import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  fullsize: PropTypes.bool,
};

const MainPanel = ({ children, fullsize }) => {
  const panelStyles = fullsize ? { width: '100vw' } : {};

  return (
    <div styleName='MainPanel' style={panelStyles}>
      {children}
    </div>
  );
};

MainPanel.propTypes = propTypes;
MainPanel.defaultProps = {
  fullsize: false,
};

export default CSSModules(MainPanel, styles); // { allowMultiple: true }
