import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  incident: PropTypes.object.isRequired,
};

const IncidentDetails = ({ incident }) => (
  <div styleName='IncidentDetails'>
    <div styleName='wrapper'>
      <h2>{incident.title}</h2>
      <strong>Description</strong>
      <p>{incident.description}</p>
      <p>Here comes incidents Response unit related stuff too</p>
    </div>
  </div>
);

IncidentDetails.propTypes = propTypes;
// IncidentDetails.defaultProps = {};

export default CSSModules(IncidentDetails, styles); // { allowMultiple: true }
