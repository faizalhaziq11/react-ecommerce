import axios from 'axios';

const instance = axios.create({
  baseURL: '/fake-store',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getErrorMessage(error) {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Something went wrong';
    }
  } else if (error.request) {
    return 'No response from server. Please check your network connection';
  } else {
    return `Error: ${error.message ?? 'Something went wrong'}`;
  }
}

function isAborted(error) {
  if (!error) return false;

  if (axios.isCancel && axios.isCancel(error)) return true;
  if (error.code === 'ERR_CANCELED') return true;
  if (error.name === 'CancelledError' || error.name === 'AbortError')
    return true;

  return false;
}

function handleResponse(response) {
  const data = response.data;

  if (data === '' || data === null || data === undefined) {
    return 'No data found';
  }

  return data;
}

async function request(method, url, any = undefined, config = {}) {
  try {
    const response = await instance.request({
      method,
      url,
      data: any,
      ...config,
    });

    return handleResponse(response);
  } catch (err) {
    if (isAborted(err)) {
      const abortErr = new Error('Request aborted');
      abortErr.name = 'AbortError';
      throw abortErr;
    }

    const message = getErrorMessage(err);
    const error = new Error(message);
    error.name = err.name ?? 'HTTPError';
    error.original = err;
    throw error;
  }
}

export const http = {
  get: (url, config = {}) => request('GET', url, undefined, config),
  post: (url, data, config = {}) => request('POST', url, data, config),
  put: (url, data, config = {}) => request('PUT', url, data, config),
  delete: (url, config = {}) => request('DELETE', url, undefined, config),
};
