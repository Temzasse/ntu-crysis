import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

// Components
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const propTypes = {
  something: PropTypes.object,
};

class NavigationContainer extends Component {
  constructor(props) {
    super(props);

    this.closeNavPanel = this.closeNavPanel.bind(this);
    this.openNavPanel = this.openNavPanel.bind(this);

    this.state = {
      mobileNavOpen: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  closeNavPanel() {
    this.setState({ mobileNavOpen: false });
  }

  openNavPanel() {
    this.setState({ mobileNavOpen: true });
  }

  render() {
    const navItems = [
      { label: 'Main Page', to: '/login' },
      { label: 'Report Incident', to: '/report-incident' },
      { label: 'Logout', to: '/logout' },
    ];

    return (
      <div className='NavigationContainer'>
        <DesktopNav
          navItems={navItems}
          brandImg='/images/crysis-logo.png'
        />
        <MobileNav
          navItems={navItems}
          brandImg='/images/crysis-logo.png'
          onClose={this.closeNavPanel}
          onOpen={this.openNavPanel}
          isOpen={this.state.mobileNavOpen}
        />
      </div>
    );
  }

}

NavigationContainer.propTypes = propTypes;
// NavigationContainer.defaultProps = {};

export default NavigationContainer;
