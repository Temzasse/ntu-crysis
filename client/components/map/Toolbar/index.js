import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Components
import Tooltip from '../../utils/Tooltip';

// Styles
import styles from './index.scss';

const propTypes = {
  toggleMarkerVisibility: PropTypes.func.isRequired,
  archiveCurrentCrisis: PropTypes.func.isRequired,
  controlMap: PropTypes.object.isRequired,
  disableArchiving: PropTypes.bool.isRequired,
};

const Toolbar = ({
  toggleMarkerVisibility, archiveCurrentCrisis, controlMap,
  disableArchiving,
}) => {
  const weatherTooltipContent = controlMap.visibility.weather ?
    'Hide weather markers' :
    'Show weather markers';

  const archiveTooltipContent = disableArchiving ?
    'You cannot archive crisis while there is still active incidents' :
    'New crisis will be initialized when you archive crisis';

  return (
    <div styleName='Toolbar'>
      <Tooltip content={weatherTooltipContent}>
        <button onClick={() => toggleMarkerVisibility('weather')}>
          <i className='ion-ios-toggle-outline' />
        </button>
      </Tooltip>

      <Tooltip content={archiveTooltipContent}>
        <button
          onClick={archiveCurrentCrisis}
          disabled={disableArchiving}
        >
          <i className='ion-ios-box-outline' />&nbsp;
          Archive current crisis
        </button>
      </Tooltip>
    </div>
  );
};

Toolbar.propTypes = propTypes;
// Toolbar.defaultProps = {};

export default CSSModules(Toolbar, styles); // { allowMultiple: true }
