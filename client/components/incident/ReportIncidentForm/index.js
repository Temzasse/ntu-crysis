import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { addIncident } from '../../../actions/index.actions';

// Components
import Tooltip from '../../utils/Tooltip';

// Styles
import styles from './index.scss';

const propTypes = {
  addIncident: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

class ReportIncidentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: '',
      type: 'LAN',
      area: 'NE',
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
        !this.props.lng ||
        !this.props.lat ||
        !this.state.description
    ) {
      console.debug('====> form not complete!');
    } else {
      this.props.addIncident({
        title: this.state.title,
        type: this.state.type,
        area: this.state.area,
        description: this.state.description,
        latitude: this.props.lat,
        longitude: this.props.lng,
      });
      const formNode = this.formRef;
      formNode.reset();
    }
  }

  render() {
    const { title, type, area, description } = this.state;
    const { lat, lng } = this.props;

    const submitDisabled = !title || !type || !area || !lat || !lng || !description; // eslint-disable-line

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
              onChange={ev => this.setState({ area: ev.target.value })}
              required
            >
              <option value='NE'>North-East</option>
              <option value='NW'>North-West</option>
              <option value='SE'>South-East</option>
              <option value='SW'>South-West</option>
            </select>
          </label>

          <label htmlFor='latitude'>
            <span>
              Latitude&nbsp;
              <Tooltip
                content='Click the map to update lat / lng.'
                style={{ display: 'inline-block' }}
              >
                <i className='ion-ios-information-outline' />
              </Tooltip>
            </span>
            <input
              name='latitude'
              disabled
              value={lat}
              required
            />
          </label>

          <label htmlFor='longitude'>
            <span>
              Longitude&nbsp;
              <Tooltip
                content='Click the map to update lat / lng.'
                style={{ display: 'inline-block' }}
              >
                <i className='ion-ios-information-outline' />
              </Tooltip>
            </span>
            <input
              name='longitude'
              disabled
              value={lng}
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

          <button
            type='submit'
            disabled={submitDisabled}
          >
            Send report
          </button>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addIncident,
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(CSSModules(ReportIncidentForm, styles));
