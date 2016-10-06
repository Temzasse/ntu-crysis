import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  something: PropTypes.object,
};

const IncidentDetails = () => (
  <div styleName='IncidentDetails'>
    IncidentDetails here
  </div>
);

IncidentDetails.propTypes = propTypes;
// IncidentDetails.defaultProps = {};

export default CSSModules(IncidentDetails, styles); // { allowMultiple: true }
