import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  backBtnAction: PropTypes.func.isRequired,
};

const BackBtnBar = ({ backBtnAction }) => (
  <div styleName='BackBtnBar'>
    <div styleName='bar'>
      <span onClick={backBtnAction}>
        <i className='ion-ios-arrow-thin-left' />
        &nbsp;Back
      </span>
    </div>
  </div>
);

BackBtnBar.propTypes = propTypes;

export default CSSModules(BackBtnBar, styles);
