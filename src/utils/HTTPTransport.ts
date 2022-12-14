const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

type Data<T> = { [x: string]: T; };

type Options = {
  data?: Data<unknown>;
  method?: string;
  headers?: Data<string>;
  timeout?: number;
}

type HTTPMethod = (url: string, options?: Options) => Promise<any>
type HTTPMethodData = (url: string, data?: any, options?: Options) => Promise<any>

function queryStringify(data: Data<unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data is not an object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  };

  get: HTTPMethod = (url, options) => {
    return this.request(this.endpoint + url, {...options, method: METHODS.GET}, options?.timeout);
  };
  put: HTTPMethod = (url, options) => {
    return this.request(this.endpoint + url, {...options, method: METHODS.PUT}, options?.timeout);
  };
  post: HTTPMethodData = (url, data, options) => {
    return this.request(this.endpoint + url, {...options, method: METHODS.POST, data}, options?.timeout);
  };
  delete: HTTPMethod = (url, options) => {
    return this.request(this.endpoint + url, {...options, method: METHODS.DELETE}, options?.timeout);
  };

  // options:
  // headers — obj
  // data — obj
  request = (url: string | URL, options: Options, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
