import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Redirect } from 'react-router';
import { doReportIncident } from '../../actions/index.actions';


// Components
import ReportIncidentForm from './ReportIncidentForm';
import MapContainer from '../../components/map/MapContainer';

const propTypes = {
  doReportIncident: PropTypes.func.isRequired,
};

class ReportIncidentContainer extends Component {
  constructor(props) {
    super(props);

    this.handleArea = this.handleArea.bind(this);
    this.handleReportIncident = this.handleReportIncident.bind(this);

    this.state = {
      title: '',
      area: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleArea(area) {
    this.setState({ area });
    if (area === 'Choa Chu Kang') {
      console.log('Area 111', area);
    }
    if (area === 'Bukit Batok') {
      console.log('Area 222', this.state.area);
    }
  }

  handleReportIncident() {
  }

  render() {
    return (
      <div styleName='ReportIncidentContainer'>
        <ReportIncidentForm
          handleArea={this.handleArea}
          handleReportIncident={this.handleReportIncident}
        />
        <MapContainer />
      </div>

    );
  }

}


ReportIncidentContainer.propTypes = propTypes;
// ReportIncidentContainer.defaultProps = {};

export default ReportIncidentContainer;
