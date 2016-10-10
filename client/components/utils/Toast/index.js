import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  messages: PropTypes.array.isRequired,
  removeToastMsg: PropTypes.func.isRequired,
};

/*
 * NOTE:
 * Toast component is NOT responsible of removing messages automatically
 * after x seconds by itself!
 *
 * This is done somewhere else (eg. sagas).
 *
 * This Toast component just renders the messages it receives and allows
 * the user to remove messages manually.
 */

// Custom animation transition names because of CSS Modules
const transitionNames = {
  enter: styles.animEnter,
  enterActive: styles.animEnterActive,
  leave: styles.animLeave,
  leaveActive: styles.animLeaveActive,
  appear: styles.animAppear,
  appearActive: styles.animAppearActive,
};

// NOTE: use default parameters instead of defaultProps
const Toast = ({ messages = [], removeToastMsg }) => (
  <div styleName='Toast'>
    <ul>
      {/* Use ReactCSSTransitionGroup for fade in/out effect */}
      <ReactCSSTransitionGroup
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
        component='div'
        transitionName={{ ...transitionNames }}
      >
        {messages.map((msg, idx) =>
          <li
            key={idx}
            styleName={msg.type === 'error' ? 'error' : 'info'}
          >
            <div styleName='msg-content'>{msg.content}</div>
            <i
              className='ion-ios-close-empty'
              onClick={() => removeToastMsg(idx)}
            />
          </li>
        )}
      </ReactCSSTransitionGroup>
    </ul>
  </div>
);

Toast.propTypes = propTypes;

export default CSSModules(Toast, styles);
