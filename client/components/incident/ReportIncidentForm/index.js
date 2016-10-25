import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router';
// import CSSModules from 'react-css-modules';
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

    this.handleReportIncident = this.handleReportIncident.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleDescription = this.handleDescription.bind(this);

    this.state = {
      title: '',
      type: 'UN',
      longitude: 0,
      latitude: 0,
      area: 'UN',
      description: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleReportIncident(evnt) {
    console.log('HELP!');
    evnt.preventDefault();
    if (this.state.title === '' ||
      this.state.area === 'UN' ||
      this.state.type === 'UN' ||
      this.state.long === '0' ||
      this.state.lat === '0' ||
      this.state.description === ''
    ) {
      console.log('Incomplete field!');
    } else {
      const formNode = this.formRef;
      formNode.reset();
      this.props.doReportIncident(this.state);
    }
  }

  handleTitle(title) {
    console.log('Title', title);
    this.setState({ title });
  }

  handleType(type) {
    console.log('Type', type);
    this.setState({ type });
  }

  handleLocation(location) {
    if (location === 'UN') {
      console.log('Location ', location);
      this.setState({ area: 'UN', longitude: 0, latitude: 0 });
    }
    if (location === 'Choa Chu Kang') {
      console.log('location 111', location);
      this.setState({
        area: 'NW',
        latitude: 1.3840.toFixed(4),
        longitude: 103.7470.toFixed(4),
      });
    }
    if (location === 'Bukit Batok') {
      console.log('location 222', location);
      this.setState({
        area: 'NW',
        latitude: 1.3590.toFixed(4),
        longitude: 103.7637.toFixed(4),
      });
    }
    if (location === 'Changi') {
      console.log('location 333', location);
      this.setState({
        area: 'NE',
        latitude: 1.3450,
        longitude: 103.9832.toFixed(4),
      });
    }
  }

  handleDescription(description) {
    console.log('Description ', description);
    this.setState({ description });
  }

  render() {
    return (
      <form
        className='ReportIncidentForm'
        ref={ref => { this.formRef = ref; }}
        onSubmit={this.handleReportIncident}
      >
        <div styleName='IncidentField'>
          <div styleName='c1'>
            <img
              id='test1'
              src='/images/crysis-logo.png' alt='brand logo' height='70'
            />
          </div>
          <table>
            <tr>
              <td>Title</td>
              <td><input
                onChange={event => this.handleTitle(event.target.value)}
                name='title'
              /></td>
            </tr>
            <tr>
              <td>Type</td>
              <td><select
                name='type'
                id='typeID'
                onChange={event => this.handleType(event.target.value)}
              >
                <option value='UN' />
                <option value='LAN'>Land</option>
                <option value='AIR'>Air</option>
                <option value='SEA'>Sea</option>
              </select>
              </td>
            </tr>
            <td>Location</td>
            <td><select
              name='location'
              onChange={event => this.handleLocation(event.target.value)}
            >
              <option value='UN' />
              <option value='Bukit Batok' >Bukit Batok</option>
              <option value='Changi' >Changi</option>
              <option value='Choa Chu Kang'>Choa Chu Kang</option>
            </select>
            </td>
            <tr>
              <td>Lat</td>
              <td><input name='latitude' disabled value={this.state.latitude} /></td>
            </tr>
            <tr>
              <td>Long</td>
              <td><input name='longitude' disabled value={this.state.longitude} /></td>
            </tr>
            <tr>
              <td>Area</td>
              <td><input name='area' disabled value={this.state.area} />
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td><textarea
                rows='4'
                cols='15'
                onChange={event => this.handleDescription(event.target.value)}
              /></td>
            </tr>
            <tr>
              <td />
              <td><button type='submit'>Report</button></td>
            </tr>
          </table>
        </div>
      </form>
    );
  }
}
ReportIncidentForm.propTypes = propTypes;
// ReportIncidentForm.defaultProps = {};

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
)(ReportIncidentForm);
// export default
// CSSModules(ReportIncidentForm, styles); // { allowMultiple: true }
