import React from 'react';

// Component imports
import MapContainer from '../components/map/MapContainer';
import FlexLayout from '../components/layout/FlexLayout';
import MainPanel from '../components/layout/MainPanel';
import Sidebar from '../components/layout/Sidebar';
import IncidentDetails from '../components/incident/IncidentDetails';


const Dashboard = () => (
  <div className='Dashboard'>
    <FlexLayout direction='row'>

      <Sidebar>
        <div style={{ height: 200 }}>
          Active Incidents
        </div>
        <div style={{ height: 200 }}>
          Reporting
        </div>
      </Sidebar>

      <MainPanel>
        <FlexLayout direction='column'>
          <div>Crisis situation here</div>
          <MapContainer />
          <IncidentDetails />
        </FlexLayout>
      </MainPanel>

    </FlexLayout>
  </div>
);

export default Dashboard;
