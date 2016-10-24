/*
///////////////////////
// WEBSOCKET SERVICE //
///////////////////////
*/

import * as actions from '../actions/index.actions';

// TODO: these could be moved to config file.
const wsPort = 8000;
const wsEndpoint = 'cms';
const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
const url = `localhost:${wsPort}/${wsEndpoint}`;
const ws = new WebSocket(`${scheme}://${url}`);


export const connect = (store) => {
  console.debug('[WEBSOCKET] Connect');

  ws.onmessage = ({ data }) => {
    try {
      const json = JSON.parse(data);

      console.debug('[WEBSOCKET] Receive data', json);

      if (json.type && json.payload) {
        console.debug('[WEBSOCKET] Dispatching action', json);

        // Dispatch the action
        store.dispatch(json);

        // Dispatch additional actions (show toast message etc.)
        if (json.type === 'INCIDENT_NEW') {
          store.dispatch(actions.addMessage({
            type: 'info',
            content: 'New incident!',
          }));
        }
      } else {
        console.error('[WEBSOCKET] Data in wrong format!', json);
      }
    } catch (e) {
      console.error(e);
    }
  };

  ws.onclose = (e) => {
    console.debug(
      '[WEBSOCKET] Socket is closed. Reconnect will be attempted in 1 second.',
      e.reason
    );
    setTimeout(() => {
      connect();
    }, 1000);
  };

  ws.onerror = (err) => {
    console.error(
      '[WEBSOCKET] Socket encountered error: ',
      err.message, 'Closing socket'
    );
    ws.close();
  };
};

export const send = (data) => {
  console.debug('[WEBSOCKET] Sending data', data);
  ws.send(JSON.stringify(data));
};

export const close = () => ws.close();
