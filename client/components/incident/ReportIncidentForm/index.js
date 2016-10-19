import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  doReportIncident: PropTypes.func.isRequired,
};

class ReportIncidentForm extends Component {
  constructor(props) {
    super(props);

    this.handleReportIncident = this.handleReportIncident.bind(this);
    this.handleArea = this.handleArea.bind(this);
    this.state = {
      long: '0',
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
  //  const area  = this.state.long;
  }

  handleArea(area) {
    if (area === 'Choa Chu Kang') {
      console.log('Area 111', area);
    }
    if (area === 'Bukit Batok') {
      console.log('Area 222', area);
    }
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
              <td><input /></td>
            </tr>
            <tr>
              <td>Type</td>
              <td><select name='type'>
                <option value='Land'>Land</option>
                <option value='Sea'>Sea</option>
              </select>
              </td>
            </tr>
            <tr>
              <td>Long</td>
              <td><input name='long' disabled value='0' /></td>
            </tr>
            <tr>
              <td>Lat</td>
              <td><input name='lat' disabled value='0' /></td>
            </tr>
            <tr>
              <td>Area</td>
              <td><select
                name='area'
                onChange={event => this.handleArea(event.target.value)}
              >
                <option value='Bukit Batok' >Bukit Batok</option>
                <option value='Choa Chu Kang'>Choa Chu Kang</option>
              </select>
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td><textarea rows='4' cols='15' /></td>
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

export default
CSSModules(ReportIncidentForm, styles); // { allowMultiple: true }
