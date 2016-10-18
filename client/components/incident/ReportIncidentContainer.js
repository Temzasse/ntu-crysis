import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

// Components
import ReportIncidentForm from './ReportIncidentForm';

const propTypes = {
  something: PropTypes.object,
};

class ReportIncidentContainer extends Component {
  constructor(props) {
    super(props);

    this.handleArea = this.handleArea.bind(this);
    this.handleReportIncident = this.handleReportIncident.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleArea(area) {
    console.log('Area', area);
  }

  handleReportIncident() {
    console.log('BOOM');
  }

  render() {
    return (
      <div styleName='ReportIncidentContainer'>
        <ReportIncidentForm
          handleArea={this.handleArea}
          handleReportIncident={this.handleReportIncident}
        />
      </div>
    );
  }

}


ReportIncidentContainer.propTypes = propTypes;
// ReportIncidentContainer.defaultProps = {};

export default ReportIncidentContainer;
