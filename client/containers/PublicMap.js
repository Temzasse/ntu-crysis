import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { fetchIncidents } from '../actions/index.actions';

// Component imports
import FlexLayout from '../components/layout/FlexLayout';
import MainPanel from '../components/layout/MainPanel';
import MapProvider from '../components/map/MapProvider';
import PublicMapContainer from '../components/map/PublicMapContainer';

const propTypes = {
  fetchIncidents: PropTypes.func.isRequired,
};

class PublicMap extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchIncidents();
  }

  render() {
    return (
      <div className='PublicMap'>
        <FlexLayout>
          <MainPanel fullsize>
            <MapProvider>
              <PublicMapContainer />
            </MapProvider>
          </MainPanel>
        </FlexLayout>
      </div>
    );
  }
}

PublicMap.propTypes = propTypes;

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchIncidents,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicMap);
