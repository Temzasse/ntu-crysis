import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  leftPanelComponent: PropTypes.func.isRequired,
  rightPanelComponent: PropTypes.func.isRequired,
  visiblePanel: PropTypes.string.isRequired,
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.togglePanel = this.togglePanel.bind(this);
    this.state = {
      visiblePanel: 'left',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  togglePanel() {
    const { visiblePanel } = this.state;
    this.setState({
      visiblePanel: visiblePanel === 'left' ? 'right' : 'left',
    });
  }

  render() {
    const {
      leftPanelComponent,
      rightPanelComponent,
      visiblePanel,
    } = this.props;

    const panelsStyles = {
      transform: visiblePanel === 'left' ?
        'translateX(0px)' :
        'translateX(-300px)',
    };

    return (
      <div styleName='Sidebar'>
        <div styleName='panels' style={panelsStyles}>
          <div styleName='left' onClick={this.togglePanel}>
            {React.createElement(leftPanelComponent, {})}
          </div>
          <div styleName='right' onClick={this.togglePanel}>
            {React.createElement(rightPanelComponent, {})}
          </div>
        </div>
      </div>
    );
  }

}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = {
  visiblePanel: 'left',
};

export default CSSModules(Sidebar, styles); // { allowMultiple: true }
