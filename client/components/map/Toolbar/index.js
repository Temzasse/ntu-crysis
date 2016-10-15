import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Components
import Tooltip from '../../utils/Tooltip';

// Styles
import styles from './index.scss';

const propTypes = {
  toggleMarkerVisibility: PropTypes.func.isRequired,
  controlMap: PropTypes.object.isRequired,
};

const Toolbar = ({ toggleMarkerVisibility, controlMap }) => {
  const tooltipContent = controlMap.visibility.weather ?
    'Hide weather markers' :
    'Show weather markers';

  return (
    <div styleName='Toolbar'>
      <Tooltip content={tooltipContent}>
        <button onClick={() => toggleMarkerVisibility('weather')}>
          <i className='ion-ios-toggle-outline' />
        </button>
      </Tooltip>
    </div>
  );
};

Toolbar.propTypes = propTypes;
// Toolbar.defaultProps = {};

export default CSSModules(Toolbar, styles); // { allowMultiple: true }
