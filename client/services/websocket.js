/*
///////////////////////
// WEBSOCKET SERVICE //
///////////////////////
*/

// TODO: these could be moved to config file.
const wsPort = 8000;
const wsEndpoint = 'cms';
const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
const url = `localhost:${wsPort}/${wsEndpoint}`;
const ws = new WebSocket(`${scheme}://${url}`);


export const connect = (store) => {
  console.debug('[WEBSOCKET] ====> connect');
  ws.onmessage = ({ data }) => {
    console.debug('[WEBSOCKET] ====> receive', data);
    try {
      const json = JSON.parse(data);
      if (data.type && data.payload) store.dispatch(data);
      else console.error('Websocket data in wrong format!', json);
    } catch (e) {
      console.error(e);
    }
  };
};

export const send = (data) => {
  console.debug('[WEBSOCKET] ====> sending', data);
  ws.send(JSON.stringify(data));
};

export const close = () => ws.close();
