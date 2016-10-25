import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Redirect from 'react-router/Redirect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { } from '../selectors';

// Actions
import {
  fetchIncident, updateIncident, fetchResponseUnit,
} from '../actions/index.actions';


/* eslint-disable max-len */

// Component imports
// import FlexLayout from '../components/layout/FlexLayout';
// import MainPanel from '../components/layout/MainPanel';
// import Sidebar from '../components/layout/Sidebar';
import ResponseUnitForm from '../components/responseunit/ResponseUnitForm';
/* eslint-enable max-len */

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  incidentMapping: PropTypes.object.isRequired,
  ruMapping: PropTypes.object.isRequired,
  fetchIncident: PropTypes.func.isRequired,
  fetchResponseUnit: PropTypes.func.isRequired,
  updateIncident: PropTypes.func.isRequired,
};

class ResponseUnitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsAuthenticated: false,
    };
  }

  componentWillMount() {
    const { loggedIn, currentUser } = this.props;

    if (loggedIn) {
      if (currentUser.role === 'operator' ||
          currentUser.role === 'responseunit') {
        this.setState({ userIsAuthenticated: true });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { userIsAuthenticated } = this.state;
    const { incidentMapping, ruMapping } = this.props;

    if (!userIsAuthenticated) {
      return <Redirect to='/login' />;
    }

    return (
      <div className='ResponseUnitPage'>
        <ResponseUnitForm
          incidentMapping={incidentMapping}
          ruMapping={ruMapping}
          fetchIncident={this.props.fetchIncident}
          fetchResponseUnit={this.props.fetchResponseUnit}
          updateIncident={this.props.updateIncident}
        />
      </div>
    );
  }
}

ResponseUnitPage.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    currentUser: state.user.user,
    incidentMapping: state.incident.all,
    ruMapping: state.responseunits.all,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchIncident,
    updateIncident,
    fetchResponseUnit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseUnitPage);
