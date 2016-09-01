/*
 * API service
 */

// import qs from 'qs';
// const qsOptions = { arrayFormat: 'repeat' };

const API_URL = `${process.env.API_BASE_PATH}`;


async function callApi(endpoint, method = 'get', bodyData = null) {
  const fullUrl = (endpoint.indexOf(API_URL) === -1)
    ? API_URL + endpoint
    : endpoint;

  let reqOptions;

  // Dynamically determine request options
  if (method === 'get' || method === 'delete') {
    reqOptions = { method };
  } else if (method === 'post' || method === 'put') {
    reqOptions = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    };
  } else throw new Error('Unsupported method');

  // Fetch the resource
  const res = await fetch(fullUrl, reqOptions);
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

export async function fetchSomething() {
  const { response } = await callApi('/something');
  return response;
}

export async function fetchSomethingElse() {
  const { response } = await callApi('/something');
  return response;
}
