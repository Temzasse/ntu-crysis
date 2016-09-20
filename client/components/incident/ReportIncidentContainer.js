import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

// Components


const propTypes = {
  something: PropTypes.object,
};

class ReportIncidentContainer extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div styleName='ReportIncidentContainer'>
        ReportIncidentContainer
      </div>
    );
  }

}

ReportIncidentContainer.propTypes = propTypes;
// ReportIncidentContainer.defaultProps = {};

export default ReportIncidentContainer;
