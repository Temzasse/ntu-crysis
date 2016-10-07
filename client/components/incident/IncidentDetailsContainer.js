import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearSelectedIncident } from '../../actions/index.actions';

// Components
import IncidentDetails from './IncidentDetails';
import BackBtnBar from '../layout/BackBtnBar';

const propTypes = {
  selectedIncident: PropTypes.object,
  clearSelectedIncident: PropTypes.func.isRequired,
};

class IncidentDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { selectedIncident } = this.props;

    return (
      <div className='IncidentDetailsContainer'>

        <BackBtnBar backBtnAction={this.props.clearSelectedIncident} />

        {selectedIncident &&
          <IncidentDetails
            incident={selectedIncident}
          />
        }

      </div>
    );
  }

}

IncidentDetailsContainer.propTypes = propTypes;
// IncidentDetailsContainer.defaultProps = {};

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    selectedIncident: state.incident.selected,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedIncident,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(IncidentDetailsContainer);
