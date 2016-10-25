import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSelectedIncident } from '../../selectors';

import {
  clearSelectedIncident, updateIncident,
} from '../../actions/index.actions';

// Components
import IncidentDetails from './IncidentDetails';
import ResponseUnitAttacher from './ResponseUnitAttacher';
import BackBtnBar from '../layout/BackBtnBar';

const propTypes = {
  selectedIncident: PropTypes.object,
  allResponseunits: PropTypes.array.isRequired,
  clearSelectedInc: PropTypes.func.isRequired,
  updateInc: PropTypes.func.isRequired,
};

const IncidentDetailsContainer = (
  { selectedIncident, allResponseunits, clearSelectedInc, updateInc }
) => (
  <div className='IncidentDetailsContainer'>
    <BackBtnBar backBtnAction={clearSelectedInc} />

    {selectedIncident &&
      <div>
        <IncidentDetails
          incident={selectedIncident}
        />
        <br />
        <ResponseUnitAttacher
          incident={selectedIncident}
          attach={updateInc}
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
    updateInc: updateIncident,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(IncidentDetailsContainer);
