import axios from 'axios';

class HttpError extends Error {
  constructor(message, { status = 0, name = 'HTTPError', original = null } = {}) {
    super(message);
    this.name = name;
    this.status = status;
    this.original = original;
  }
}

class AbortError extends HttpError {
  constructor(message = 'Request aborted') {
    super(message, { name: 'AbortError' });
  }
}

class ResponseHandler {
  static handleSuccess(response) {
    const { data } = response;

    if (data === '' || data === null || data === undefined) {
      return 'No data found';
    }

    return data;
  }

  static handleError(error) {
    if (HttpClient.isAborted(error)) {
      throw new AbortError();
    }

    throw new HttpError(ResponseHandler.getErrorMessage(error), {
      status: error.response?.status ?? 0,
      name: error.name ?? 'HTTPError',
      original: error,
    });
  }

  static getErrorMessage(error) {
    if (error.response) {
      const status = error.response.status;
      const messages = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
      };

      return messages[status] ?? 'Something went wrong';
    }

    if (error.request) {
      return 'No response from server. Please check your network connection';
    }

    return `Error: ${error.message ?? 'Something went wrong'}`;
  }
}

class HttpClient {
  constructor(config = {}) {
    this.instance = axios.create({
      baseURL: '/fake-store',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  static isAborted(error) {
    if (!error) return false;

    if (axios.isCancel && axios.isCancel(error)) return true;
    if (error.code === 'ERR_CANCELED') return true;
    if (error.name === 'CancelledError' || error.name === 'AbortError')
      return true;

    return false;
  }

  async request(method, url, data = undefined, config = {}) {
    try {
      const response = await this.instance.request({
        method,
        url,
        data,
        ...config,
      });

      return ResponseHandler.handleSuccess(response);
    } catch (error) {
      ResponseHandler.handleError(error);
    }
  }

  get(url, config = {}) {
    return this.request('GET', url, undefined, config);
  }

  post(url, data, config = {}) {
    return this.request('POST', url, data, config);
  }

  put(url, data, config = {}) {
    return this.request('PUT', url, data, config);
  }

  delete(url, config = {}) {
    return this.request('DELETE', url, undefined, config);
  }
}

const http = new HttpClient();

export { http, HttpClient, HttpError, AbortError };
