import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CSSModules from 'react-css-modules';
import { utils } from '../../../services';

// Styles
import styles from './index.scss';

const propTypes = {
  incidentMapping: PropTypes.object.isRequired,
  ruMapping: PropTypes.object.isRequired,
  fetchIncident: PropTypes.func.isRequired,
  fetchResponseUnit: PropTypes.func.isRequired,
  updateIncident: PropTypes.func.isRequired,
};

const typeMappings = {
  'LAN': 'Land',
  'SEA': 'Sea',
  'AIR': 'Air',
};


class ResponseUnitForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      ruic: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    const { incidentMapping } = this.props;
    const { disableSubmit, ruic } = this.state;
    const incId = ruic.split('#')[0];

    if (utils.isNormalInteger(incId) && !disableSubmit) {
      const incident = incidentMapping[parseInt(incId, 10)];
      incident.resolved = true;

      this.props.updateIncident({
        id: parseInt(incId, 10),
        data: incident,
      });
    }
  }

  handleInputChange(e) {
    const ruic = e.target.value;
    console.log('::', ruic);
    const [incId, ruId] = ruic.split('#');
    console.debug('====> incId, ruId', incId, ruId);

    if (utils.isNormalInteger(incId) && utils.isNormalInteger(ruId)) {
      this.props.fetchIncident(parseInt(incId, 10));
      this.props.fetchResponseUnit(parseInt(ruId, 10));
    }

    this.setState({ ruic });
  }

  render() {
    const { incidentMapping, ruMapping } = this.props;
    const { ruic } = this.state;
    const [incId, ruId] = ruic.split('#');
    const incidentDetails = incId ? incidentMapping[parseInt(incId, 10)] : null;
    const ruDetails = ruId ? ruMapping[parseInt(ruId, 10)] : null;
    const submitDisabled = !incidentDetails ? true : incidentDetails.resolved;

    return (
      <div styleName='ResponseUnitForm'>
        <div styleName='logo-wrapper'>
          <img src='images/crysis-logo.png' alt='brand logo' height='100' />
        </div>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='ruic'>
            Response Unit Incident Code:
            <input
              onChange={this.handleInputChange}
              placeholder='<incident ID>#<runit ID>'
              name='ruic'
            />
          </label>

          <hr />

          <div styleName='inc-ru-details'>
            {!!incidentDetails &&
              <div styleName='details'>
                <div styleName='detail-title'>Incident details</div>
                <div styleName='detail-row'>
                  Title: {incidentDetails.title}
                </div>
                <div styleName='detail-row'>
                  Type: {typeMappings[incidentDetails.type]}
                </div>
                <div styleName='detail-row'>
                  {incidentDetails.resolved ?
                    <div styleName='resolved'>Resolved</div> :
                    <div styleName='not-resolved'>Not resolved yet!</div>
                  }
                </div>
              </div>
            }
            {!!ruDetails && <br />}
            {!!ruDetails &&
              <div styleName='details'>
                <div styleName='detail-title'>Response unit details</div>
                <div styleName='detail-row'>
                  Name: {ruDetails.name}
                </div>
                <div styleName='detail-row'>
                  Speciality: {typeMappings[ruDetails.speciality]}
                </div>
              </div>
            }

            {!!incidentDetails && <hr />}
          </div>

          <button type='submit' disabled={submitDisabled}>
            Resolve incident
          </button>
        </form>
      </div>
    );
  }
}

ResponseUnitForm.propTypes = propTypes;
export default CSSModules(ResponseUnitForm, styles);
