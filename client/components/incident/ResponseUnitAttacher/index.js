import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

// Components
import Tooltip from '../../utils/Tooltip';

const propTypes = {
  incident: PropTypes.object.isRequired,
  responseunits: PropTypes.object.isRequired,
  attach: PropTypes.func.isRequired,
};

const specialityMappings = {
  'LAN': 'Land',
  'SEA': 'Sea',
  'AIR': 'Air',
};

const areaMappings = {
  'NE': 'North-east',
  'SE': 'South-east',
  'NW': 'North-west',
  'NS': 'North-west',
};

const renderRUCard = (ru) => (
  <div styleName='ru-card'>
    <div styleName='name'>
      {ru.name}
    </div>
    <span styleName='tag'>{specialityMappings[ru.speciality]}</span>
    <span styleName='tag'>{areaMappings[ru.area]}</span>
  </div>
);

const ResponseUnitAttacher = ({ incident, attach, responseunits }) => (
  <div styleName='ResponseUnitAttacher'>
    {Number.isFinite(incident.handle_by) ?
      <div>
        <h3>Incident handled by</h3>
        {renderRUCard(responseunits[incident.handle_by])}
      </div> :
      <div>
        <h3>Attach response unit</h3>
        <div styleName='attach-btn'>
          <Tooltip content='Automatically attach response unit'>
            <button onClick={() => attach(incident.id)}>
              <i className='ion-link' />
            </button>
          </Tooltip>
        </div>
      </div>
    }
  </div>
);

ResponseUnitAttacher.propTypes = propTypes;
export default CSSModules(ResponseUnitAttacher, styles);
