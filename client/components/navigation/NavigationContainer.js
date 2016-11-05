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
  currentUser: PropTypes.object,
};

class NavigationContainer extends Component {
  constructor(props) {
    super(props);

    this.closeNavPanel = this.closeNavPanel.bind(this);
    this.openNavPanel = this.openNavPanel.bind(this);
    this.getCrisisTitleElement = this.getCrisisTitleElement.bind(this);

    this.state = {
      mobileNavOpen: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getCrisisTitleElement() {
    const { loggedIn, currentUser, currentCrisis } = this.props;

    // Early escape
    if (!loggedIn || !currentCrisis || (currentUser.role !== 'operator')) {
      return null;
    }

    return (
      <div>
        {currentCrisis.title}
        {currentCrisis.ongoing &&
          <span>
            &nbsp;&nbsp;<i className='ion-minus-round' />&nbsp;&nbsp;
            <i className='ion-android-warning' />&nbsp;
            <span>crisis is active</span>
          </span>
        }
      </div>
    );
  }

  closeNavPanel() {
    this.setState({ mobileNavOpen: false });
  }

  openNavPanel() {
    this.setState({ mobileNavOpen: true });
  }

  render() {
    const { loggedIn, currentUser } = this.props;

    const navItems = [];

    if (loggedIn) {
      // Determine nav items based on users role
      if (currentUser.role === 'operator') {
        navItems.push(
          { label: 'Map', to: '/' },
          { label: 'Report Incident', to: '/report-incident' },
          { label: 'Archives', to: '/archives' },
        );
      } else if (currentUser.role === 'responseunit') {
        navItems.push(
          { label: 'Response Unit', to: '/response-unit' },
        );
      } else if (currentUser.role === 'callcenter') {
        navItems.push(
          { label: 'Report Incident', to: '/report-incident' },
        );
      }
      navItems.push(
        { label: 'Logout', to: '/login', onClick: this.props.doLogout },
      );
    } else {
      navItems.push({ label: 'Login', to: '/login' });
    }


    return (
      <div className='NavigationContainer'>
        <DesktopNav
          title={this.getCrisisTitleElement()}
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

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    currentUser: state.user.user,
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
