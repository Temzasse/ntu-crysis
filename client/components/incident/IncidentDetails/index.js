import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const typeMappings = {
  'LAN': 'Land',
  'SEA': 'Sea',
  'AIR': 'Air',
};

const areaMappings = {
  'NE': 'North-east',
  'SE': 'South-east',
  'NW': 'North-west',
  'SW': 'South-west',
};

const propTypes = {
  incident: PropTypes.object.isRequired,
};

const IncidentDetails = ({ incident }) => (
  <div styleName='IncidentDetails'>
    <div styleName='wrapper'>
      <h2>{incident.title}</h2>
      <div styleName='tags'>
        <span>{typeMappings[incident.type]}</span>
        <span>{areaMappings[incident.area]}</span>
      </div>
      <h3>Description</h3>
      <p>{incident.description}</p>
    </div>
  </div>
);

IncidentDetails.propTypes = propTypes;
export default CSSModules(IncidentDetails, styles);
