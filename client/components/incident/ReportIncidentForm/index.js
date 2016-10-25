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
  handleArea: PropTypes.func.isRequired,
  handleComments: PropTypes.func.isRequired,
};

class ReportIncidentForm extends Component {
  constructor(props) {
    super(props);

    this.handleReportIncident = this.handleReportIncident.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleArea = this.handleArea.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleComments = this.handleComments.bind(this);

    this.state = {
      title: '',
      type: '+default+',
      long: '0',
      lat: '0',
      area: '+default+',
      comments: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleReportIncident(evnt) {
    console.log('HELP!');
    evnt.preventDefault();
    const formNode = this.formRef;
    formNode.reset();
    this.props.doReportIncident(this.state);
  }

  handleTitle(title) {
    console.log('Title', title);
    this.setState({ title });
  }

  handleType(type) {
    console.log('Type', type);
    this.setState({ type });
  }

  handleArea(area) {
    if (area === '+default+') {
      console.log('Area ', area);
      this.setState({ area });
      this.setState({ long: '0' });
      this.setState({ lat: '0' });
    }
    if (area === 'Choa Chu Kang') {
      console.log('Area 111', area);
      this.setState({ area });
      this.setState({ long: '1.3840' });
      this.setState({ lat: '103.7470' });
    }
    if (area === 'Bukit Batok') {
      console.log('Area 222', area);
      this.setState({ area });
      this.setState({ long: '1.3590' });
      this.setState({ lat: '103.7637' });
    }
  }

  handleComments(comments) {
    console.log('Comments', comments);
    this.setState({ comments });
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
                <option value='+default+' />
                <option value='Land'>Land</option>
                <option value='Sea'>Sea</option>
              </select>
              </td>
            </tr>
            <tr>
              <td>Long</td>
              <td><input name='long' disabled value={this.state.long} /></td>
            </tr>
            <tr>
              <td>Lat</td>
              <td><input name='lat' disabled value={this.state.lat} /></td>
            </tr>
            <tr>
              <td>Area</td>
              <td><select
                name='area'
                onChange={event => this.handleArea(event.target.value)}
              >
                <option value='+default+' />
                <option value='Bukit Batok' >Bukit Batok</option>
                <option value='Choa Chu Kang'>Choa Chu Kang</option>
              </select>
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td><textarea
                rows='4'
                cols='15'
                onChange={event => this.handleComments(event.target.value)}
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
