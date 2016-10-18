import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  content: PropTypes.string.isRequired,
};

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);

    this.state = {
      showTooltip: false,
      lPos: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  showTooltip() {
    const tipNode = this.tooltipRef;
    const tipWrapNode = this.tooltipWrapRef;
    const lPos = -(tipNode.offsetWidth / 2) + (tipWrapNode.offsetWidth / 2);

    this.setState({ showTooltip: true, lPos });
  }

  hideTooltip() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { content, children } = this.props;
    const { showTooltip, lPos } = this.state;
    const tooltipVisibility = showTooltip ? 'visible' : 'hidden';

    return (
      <div styleName='Tooltip'>
        <div
          ref={(ref) => { this.tooltipWrapRef = ref; }}
          styleName='tooltip-wrapper'
          onMouseEnter={this.showTooltip}
          onMouseLeave={this.hideTooltip}
        >

          <div
            ref={(ref) => { this.tooltipRef = ref; }}
            styleName='tooltip-bubble'
            style={{ visibility: tooltipVisibility, left: lPos }}
          >
            {content}
          </div>

          {children}
        </div>
      </div>
    );
  }

}

Tooltip.propTypes = propTypes;

// Tooltip.defaultProps = {};

export default CSSModules(Tooltip, styles); // { allowMultiple: true }
