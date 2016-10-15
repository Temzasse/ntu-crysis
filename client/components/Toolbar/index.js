import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  toggleMarkerVisibility: PropTypes.func.isRequired,
  controlMap: PropTypes.object.isRequired,
};

const Toolbar = ({ toggleMarkerVisibility, controlMap }) => (
  <div styleName='Toolbar'>
    <button onClick={toggleMarkerVisibility}>
      {controlMap.visibility.weather ?
        'Hide weather markers' : 'Show weather markers'
      }
    </button>
  </div>
);

Toolbar.propTypes = propTypes;
// Toolbar.defaultProps = {};

export default CSSModules(Toolbar, styles); // { allowMultiple: true }
