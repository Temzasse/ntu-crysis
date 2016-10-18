import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

// Styles
import styles from './index.scss';

const propTypes = {
  handleArea: PropTypes.func.isRequired,
  handleReportIncident: PropTypes.func.isRequired,
};

const ReportIncidentForm = ({ handleArea, handleReportIncident }) => (
  <div>
    <div styleName='ReportIncidentForm'>
      <div styleName='IncidentField'>
        <div styleName='c1'>
          <img id='test1' src='/images/crysis-logo.png' alt='brand logo' height='70' />
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
            <td><input /></td>
          </tr>
          <tr>
            <td>Lat</td>
            <td><input /></td>
          </tr>
          <tr>
            <td>Area</td>
            <td><select name='area' onChange={event => handleArea(event.target.value)}>
              <option value='Bukit Batok'>Bukit Batok</option>
              <option value='Choa Chu Kang'>Choa Chu Kang</option>
            </select>
            </td>
          </tr>
          <tr>
            <td>Comments</td>
            <td><textarea rows='4' cols='15' /></td>
          </tr>
        </table>

        <center><button onClick={handleReportIncident}>Report</button></center>
      </div>
    </div>
  </div>
);

ReportIncidentForm.propTypes = propTypes;
// ReportIncidentForm.defaultProps = {};

export default
CSSModules(ReportIncidentForm, styles); // { allowMultiple: true }
