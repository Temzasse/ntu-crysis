/*
 * API service
 */

import { parseWeatherXMLtoJS } from './utils';

const API_URL = `${process.env.API_BASE_PATH}`;
const NEA_API_KEY = `${process.env.NEA_API_KEY}`;
const NEA_API_URL = `${process.env.NEA_API_URL}`;
const NEA_DATASET = '2hr_nowcast';

async function callApi(url, method = 'get', bodyData = null) {
  let reqOptions;

  // Dynamically determine request options
  if (method === 'get' || method === 'delete') {
    reqOptions = { method };
  } else if (method === 'post' || method === 'put') {
    reqOptions = {
      method,
      body: JSON.stringify(bodyData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
  } else throw new Error('Unsupported method');

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


/*
/////////////////////////
// EXPORTED API METHODS
/////////////////////////
*/

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

export async function fetchSomething() {
  const { response } = await callApi(`${API_URL}/something`);
  return response;
}
