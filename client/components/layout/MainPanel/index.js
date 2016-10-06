import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const MainPanel = ({ children }) => (
  <div styleName='MainPanel'>{children}</div>
);

MainPanel.propTypes = propTypes;
// MainPanel.defaultProps = {};

export default CSSModules(MainPanel, styles); // { allowMultiple: true }
