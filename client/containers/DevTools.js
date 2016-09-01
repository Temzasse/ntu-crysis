import React from 'react';
import { createDevTools } from 'redux-devtools'; // eslint-disable-line
import LogMonitor from 'redux-devtools-log-monitor'; // eslint-disable-line
import DockMonitor from 'redux-devtools-dock-monitor'; // eslint-disable-line

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-w'
    defaultIsVisible={false}
  >
    <LogMonitor />
  </DockMonitor>
);
