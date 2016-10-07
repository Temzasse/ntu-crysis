import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedIncident } from '../../actions/index.actions';

// Components
import IncidentList from './IncidentList';

const propTypes = {
  setSelectedIncident: PropTypes.func.isRequired,
  incidents: PropTypes.array.isRequired,
};

class IncidentListContainer extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { incidents } = this.props;

    return (
      <div className='IncidentListContainer'>
        <IncidentList
          incidents={incidents}
          selectIncident={this.props.setSelectedIncident}
        />
      </div>
    );
  }

}

IncidentListContainer.propTypes = propTypes;
// IncidentListContainer.defaultProps = {};

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    incidents: state.incident.all,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSelectedIncident,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(IncidentListContainer);
