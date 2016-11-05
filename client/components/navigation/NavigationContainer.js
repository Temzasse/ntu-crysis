import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shallowCompare from 'react-addons-shallow-compare';
import { getCurrentCrisis } from '../../selectors';

// Actions
import { doLogout } from '../../actions/index.actions';

// Components
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const propTypes = {
  doLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  currentCrisis: PropTypes.object,
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
    const { loggedIn, currentCrisis } = this.props;

    const navItems = [];

    if (loggedIn) {
      navItems.push(
        { label: 'Report Incident', to: '/report-incident' },
        { label: 'Archives', to: '/archives' },
        { label: 'Logout', to: '/login', onClick: this.props.doLogout },
      );
    } else {
      navItems.push({ label: 'Login', to: '/login' });
    }

    return (
      <div className='NavigationContainer'>
        <DesktopNav
          title={currentCrisis ? currentCrisis.title : ''}
          navItems={navItems}
          brandImg='/images/crysis-logo.png'
        />
        <MobileNav
          title={currentCrisis ? currentCrisis.title : ''}
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

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    currentCrisis: getCurrentCrisis(state),
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doLogout,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(NavigationContainer);
