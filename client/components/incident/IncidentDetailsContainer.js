import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSelectedIncident } from '../../selectors';

import {
  clearSelectedIncident, handleIncident,
} from '../../actions/index.actions';

// Components
import IncidentDetails from './IncidentDetails';
import ResponseUnitAttacher from './ResponseUnitAttacher';
import BackBtnBar from '../layout/BackBtnBar';

const propTypes = {
  selectedIncident: PropTypes.object,
  allResponseunits: PropTypes.array.isRequired,
  clearSelectedInc: PropTypes.func.isRequired,
  handleInc: PropTypes.func.isRequired,
};

const IncidentDetailsContainer = (
  { selectedIncident, allResponseunits, clearSelectedInc, handleInc }
) => (
  <div className='IncidentDetailsContainer'>
    <BackBtnBar backBtnAction={clearSelectedInc} />

    {selectedIncident &&
      <div>
        <IncidentDetails
          incident={selectedIncident}
        />
        <hr />
        <ResponseUnitAttacher
          incident={selectedIncident}
          attach={handleInc}
          responseunits={allResponseunits}
        />
      </div>
    }
  </div>
);

IncidentDetailsContainer.propTypes = propTypes;

// This makes state objects available to the component via props!
function mapStateToProps(state) {
  return {
    selectedIncident: getSelectedIncident(state),
    allResponseunits: state.responseunits.all,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSelectedInc: clearSelectedIncident,
    handleInc: handleIncident,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(IncidentDetailsContainer);
