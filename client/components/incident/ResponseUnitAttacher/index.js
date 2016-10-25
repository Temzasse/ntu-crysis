import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  incident: PropTypes.object.isRequired,
  responseunits: PropTypes.array.isRequired,
  attach: PropTypes.func.isRequired,
};

const renderRUCard = (ru) => (
  <div>
    <span>{ru.name}</span>
    <span>{ru.speciality}</span>
  </div>
);

const ResponseUnitAttacher = ({ incident, attach, responseunits }) => (
  <div styleName='ResponseUnitAttacher'>
    {Number.isFinite(incident.handle_by) ?
      <div>
        <h3>Incident handled by</h3>
        {renderRUCard(
          responseunits.find(ru => ru.id === incident.handle_by)
        )}
      </div> :
      <div>
        <h3>Attach response unit</h3>
        {incident.id}
        <button
          styleName='attach-btn'
          onClick={() => attach(incident.id)}
        >
          <i className='ion-ios-unlocked-outline' />
        </button>
      </div>
    }
  </div>
);

ResponseUnitAttacher.propTypes = propTypes;
export default CSSModules(ResponseUnitAttacher, styles);
