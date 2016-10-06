import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  children: PropTypes.array,
};

const Sidebar = ({ children }) => (
  <div styleName='Sidebar'>
    <div>{children}</div>
  </div>
);

Sidebar.propTypes = propTypes;
// Sidebar.defaultProps = {};

export default CSSModules(Sidebar, styles); // { allowMultiple: true }
