import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Redirect from 'react-router/Redirect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCrisisArray } from '../selectors';

// Actions
import { fetchAllCrises } from '../actions/index.actions';

// Component imports
import CrisisArchiveList from '../components/crisis/CrisisArchiveList';
// import FlexLayout from '../components/layout/FlexLayout';
// import MainPanel from '../components/layout/MainPanel';
// import Sidebar from '../components/layout/Sidebar';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  allCrises: PropTypes.array.isRequired,
  fetchAllCrises: PropTypes.func.isRequired,
};

class Archives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsAuthenticated: false,
    };
  }

  componentWillMount() {
    const { loggedIn, currentUser } = this.props;

    if (loggedIn) {
      if (currentUser.role === 'operator') {
        // Fetch all crises
        this.props.fetchAllCrises();
        this.setState({ userIsAuthenticated: true });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { userIsAuthenticated } = this.state;
    const { allCrises } = this.props;

    // TODO: auth checking should probably be Higher-Order-Component
    if (!userIsAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div className='Archives'>
        <CrisisArchiveList crises={allCrises} />
      </div>
    );
  }
}

Archives.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    currentUser: state.user.user,
    allCrises: getCrisisArray(state),
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllCrises,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Archives);
