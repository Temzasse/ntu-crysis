/*
 * API service
 */

import { parseWeatherXMLtoJS } from './utils';

const API_URL = `${process.env.API_BASE}/${process.env.API_ROOT}`;
const NEA_API_KEY = `${process.env.NEA_API_KEY}`;
const NEA_API_URL = `${process.env.NEA_API_URL}`;
const NEA_DATASET = '2hr_nowcast';

/*
/////////////
// HELPERS //
/////////////
*/
function getAuthHeaders() {
  // get token from session storage
  const token = sessionStorage.getItem('jwt-token');
  return token ? { 'Authorization': `Token ${token}` } : null;
}


async function callApi(url, method = 'get', bodyData = null) {
  let reqOptions;

  // Dynamically determine request options
  if (method === 'get' || method === 'delete') {
    reqOptions = { method };
  } else if (method === 'post' || method === 'put' || method === 'patch') {
    reqOptions = {
      method: method.toUpperCase(),
      body: JSON.stringify(bodyData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
  } else throw new Error('Unsupported method');

  const authHeaders = getAuthHeaders();

  // Add auth headers if needed
  if (authHeaders) {
    const currHeaders = reqOptions.headers;
    reqOptions.headers = {
      ...currHeaders,
      ...authHeaders,
    };
  }
  // Fetch the resource
  const res = await fetch(url, reqOptions);
  const contentType = res.headers.get('content-type');
  let body;

  // Parse the response based on it's content type
  if (contentType && contentType.indexOf('application/json') !== -1) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  // Reject if request failed
  if (!res.ok) {
    const rej = { response: res, body, status: res.status };
    return Promise.reject(rej);
  }

  return { response: body };
}

function getUserRole(groupList) {
  const groupNames = groupList.map(g => g.name);

  if (groupNames.indexOf('operator') !== -1) {
    return 'operator';
  } else if (groupNames.indexOf('callcenter') !== -1) {
    return 'callcenter';
  } else if (groupNames.indexOf('responseunit') !== -1) {
    return 'responseunit';
  }
  // TODO: how do we handle this case?
  console.error('Unknown user group!');
  return 'unknown';
}

/*
/////////////////////////
// EXPORTED API METHODS
/////////////////////////
*/


export async function handleIncident(id) {
  const { response } = await callApi(`${API_URL}/incident/${id}/handle/`);
  return response;
}

export async function updateIncident(id, data) {
  const { response } = await callApi(
    `${API_URL}/incident/${id}/`,
    'patch',
    data,
  );
  return response;
}

export async function fetchIncident(id) {
  const { response } = await callApi(`${API_URL}/incident/${id}/`);
  return response;
}

export async function fetchResponseUnit(id) {
  const { response } = await callApi(`${API_URL}/responseunit/${id}/`);
  return response;
}

export async function fetchResponseUnits() {
  const { response } = await callApi(`${API_URL}/responseunit/`);
  return response;
}

export async function login(userData) {
  const { response } = await callApi(
    `${API_URL}/user/login/`,
    'post',
    userData,
  );

  const { token, username, groups } = response;

  // save token to session storage
  sessionStorage.setItem('jwt-token', token);

  return {
    username,
    role: getUserRole(groups),
  };
}

export async function getCurrentUser() {
  try {
    const { response } = await callApi(`${API_URL}/user/me/`);
    const { username, groups } = response;

    return {
      username,
      role: getUserRole(groups),
    };
  } catch (e) {
    return false;
  }
}

export async function getCurrentCrisis() {
  const { response } = await callApi(`${API_URL}/crisis/current/`);
  return response;
}

export async function fetchSomething() {
  const { response } = await callApi(`${API_URL}/something`);
  return response;
}

export async function fetchWeatherData() {
  const { response } = await callApi(
    `${NEA_API_URL}?dataset=${NEA_DATASET}&keyref=${NEA_API_KEY}`
  );
  // Use the DOMParser browser API to convert text to a XML Document
  const xml = new DOMParser().parseFromString(response, 'text/xml');
  // Parse xml to js object
  const weatherData = parseWeatherXMLtoJS(xml);

  return weatherData;
}
