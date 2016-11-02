import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  crises: PropTypes.array.isRequired,
};

const CrisisArchiveList = ({ crises }) => (
  <div styleName='CrisisArchiveList'>
    <h1>
      All Crises
    </h1>

    <ul>
      {crises.map((crisis, i) => {
        const crisisStatusText = crisis.status === 'ARC' ?
          'archived' :
          'active';

        return (
          <li
            styleName={crisisStatusText}
            key={i}
          >
            <div styleName='header'>
              {crisis.title}
            </div>
            <div styleName='body'>
              <span>{crisis.incidents.length} incidents</span>
              {crisis.description &&
                <div>Description: {crisis.description}</div>
              }
            </div>
            <div styleName='footer'>
              <span styleName='tag'>
                {crisis.status === 'ARC' ?
                  <i className='ion-ios-box-outline' /> :
                  <i className='ion-ios-pulse' />
                }
                {crisisStatusText}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);


CrisisArchiveList.propTypes = propTypes;
export default CSSModules(CrisisArchiveList, styles);
