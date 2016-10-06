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

      <Sidebar
        leftPanelContent={() =>
          <div style={{ height: 200 }}>
            Active Incidents (CLICK ME!!)
          </div>
        }
        rightPanelContent={() =>
          <div style={{ height: 200 }}>
            Incident Details (CLICK ME TOO!!)
          </div>
        }
      />

      <MainPanel>
        <FlexLayout direction='column'>
          <div>Crisis situation here</div>
          <MapContainer />
          <div>Map filters here. Or something...</div>
          {/* <IncidentDetails /> */}
        </FlexLayout>
      </MainPanel>

    </FlexLayout>
  </div>
);

export default Dashboard;
