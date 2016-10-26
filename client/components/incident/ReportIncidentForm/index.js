import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { doReportIncident } from '../../../actions/index.actions';

// Styles
import styles from './index.scss';

const propTypes = {
  doReportIncident: PropTypes.func.isRequired,
  handleReportIncident: PropTypes.func.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleType: PropTypes.func.isRequired,
  handleLocation: PropTypes.func.isRequired,
  handleDescription: PropTypes.func.isRequired,
};

class ReportIncidentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: '',
      type: '',
      longitude: 0,
      latitude: 0,
      area: '',
      description: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleSubmit(evnt) {
    evnt.preventDefault();

    if (!this.state.title ||
        !this.state.area ||
        !this.state.type ||
        !this.state.long ||
        !this.state.lat ||
        !this.state.description
    ) {
      console.log('Incomplete field!');
    } else {
      this.props.doReportIncident(this.state);
      const formNode = this.formRef;
      formNode.reset();
    }
  }

  render() {
    return (
      <div styleName='ReportIncidentForm'>
        <h2>Report incident</h2>

        <form
          ref={ref => { this.formRef = ref; }}
          onSubmit={this.handleSubmit}
        >
          <label htmlFor='title'>
            Title
            <input
              onChange={ev => this.setState({ title: ev.target.value })}
              name='title'
              required
            />
          </label>

          <label htmlFor='type'>
            Type
            <select
              name='type'
              onChange={ev => this.setState({ type: ev.target.value })}
              required
            >
              <option value='LAN'>Land</option>
              <option value='AIR'>Air</option>
              <option value='SEA'>Sea</option>
            </select>
          </label>

          <label htmlFor='area'>
            Area
            <select
              name='area'
              onChange={ev => this.setState({ location: ev.target.value })}
              required
            >
              <option value='NE'>North-East</option>
              <option value='NW'>North-West</option>
              <option value='SE'>South-East</option>
              <option value='SW'>South-West</option>
            </select>
          </label>

          <label htmlFor='latitude'>
            Latitude
            <input
              name='latitude'
              disabled
              value={this.state.latitude}
              required
            />
          </label>

          <label htmlFor='longitude'>
            Longitude
            <input
              name='longitude'
              disabled
              value={this.state.longitude}
              required
            />
          </label>

          <label htmlFor='description'>
            Description
            <textarea
              rows='4'
              cols='15'
              name='description'
              onChange={ev => this.setState({ description: ev.target.value })}
              required
            />
          </label>

          <button type='submit'>Send report</button>
        </form>
      </div>
    );
  }
}
ReportIncidentForm.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    incidents: state.incident.all,
  };
}

// This adds action creators to components props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doReportIncident,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(CSSModules(ReportIncidentForm, styles));
