import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  incidents: PropTypes.array,
  selectIncident: PropTypes.func.isRequired,
};

const IncidentList = ({ incidents, selectIncident }) => (
  <div styleName='IncidentList'>
    <h2>Active incidents</h2>
    <ul>
      {incidents.map(({ id, title }) =>
        <li
          key={id}
          styleName='incident-card'
          onClick={() => selectIncident(id)}
        >
          {title}{id}
        </li>
      )}
    </ul>
  </div>
);

IncidentList.propTypes = propTypes;
export default CSSModules(IncidentList, styles);
