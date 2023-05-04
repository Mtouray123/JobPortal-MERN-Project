import { getToken } from './users-service';

async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Network response was not ok.');
  }

  // const getJobDetails = 
}

export { sendRequest };
