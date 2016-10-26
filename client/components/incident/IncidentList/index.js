import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  incidents: PropTypes.array,
  selectIncident: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

/* eslint-disable max-len */
const IncidentList = ({ incidents, selectIncident, onMouseEnter, onMouseLeave }) => (
  <div styleName='IncidentList'>
    <h2>Active incidents</h2>
    <ul>
      {incidents.map(({ id, title, handle_by: handledBy }) =>
        <li
          key={id}
          styleName='card'
          onClick={() => selectIncident(id)}
          onMouseEnter={() => onMouseEnter(id)}
          onMouseLeave={() => onMouseLeave(id)}
        >
          <div styleName='card-content'>
            <span styleName='title'>{title} ({id} {handledBy})</span>
            <span styleName={handledBy ? 'tag' : 'tag-err'}>
              {handledBy ? 'being handled' : 'unhandled'}
            </span>
          </div>
          <i className='ion-ios-arrow-right' />
        </li>
      )}
    </ul>
  </div>
);

IncidentList.propTypes = propTypes;
export default CSSModules(IncidentList, styles);

/* eslint-enable max-len */
