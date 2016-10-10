import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const transitionNames = {
  enter: styles.animEnter,
  enterActive: styles.animEnterActive,
  leave: styles.animLeave,
  leaveActive: styles.animLeaveActive,
  appear: styles.animAppear,
  appearActive: styles.animAppearActive,
};

const propTypes = {
  messages: PropTypes.array.isRequired,
  removeToastMsg: PropTypes.func.isRequired,
};

const TOAST_REMOVE_TIME = 4000;

class Toast extends Component {
  constructor(props) {
    super(props);

    this.popToastMessage = this.popToastMessage.bind(this);
  }

  componentDidMount() {
    const { messages } = this.props;
    if (messages.length) {
      this.popToastMessage(messages.length - 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Keep on popping toast messages
    const { messages } = this.props;
    if (messages.length > 0 && messages.length > nextProps.messages.length) {
      this.popToastMessage(nextProps.messages.length - 1);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  popToastMessage(idx) {
    window.setTimeout(() => {
      this.props.removeToastMsg(idx);
    }, TOAST_REMOVE_TIME);
  }

  render() {
    const { messages, removeToastMsg } = this.props;

    return (
      <div styleName='Toast'>
        <ul>
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
  }

}

Toast.propTypes = propTypes;
Toast.defaultProps = {
  messages: [],
};

export default CSSModules(Toast, styles);
