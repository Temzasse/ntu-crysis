/*
///////////////////////
// WEBSOCKET SERVICE //
///////////////////////
*/

// TODO: these could be moved to config file.
const wsEndpoint = 'crisis';
const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
const url = `${window.location.host}/${wsEndpoint}`;
const ws = new WebSocket(`${scheme}://${url}`);


export const connect = (store) => {
  console.debug('[WEBSOCKET] ====> connect');
  ws.onmessage = ({ data }) => store.dispatch(data);
};

export const send = (data) => {
  console.debug('[WEBSOCKET] ====> sending', data);
  ws.send(JSON.stringify(data));
};

export const close = () => ws.close();
