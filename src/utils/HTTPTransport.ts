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

type HTTPMethod = <Response = void>(url: string, options?: Options) => Promise<Response>
type HTTPMethodData = <Response = void>(url: string, data?: any, options?: Options) => Promise<Response>

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
    const data = options?.data;
    const uslQuery = data ? `${url}${queryStringify(data)}` : url;
    return this.request(this.endpoint + uslQuery, {...options, method: METHODS.GET}, options?.timeout);
  };
  put: HTTPMethodData = (url, data, options) => {
    return this.request(this.endpoint + url, {...options, method: METHODS.PUT, data}, options?.timeout);
  };
  post: HTTPMethodData = (url, data, options) => {
    return this.request(this.endpoint + url, {
      ...options,
      method: METHODS.POST,
      data,
    }, options?.timeout) as Promise<any>;
  };
  delete: HTTPMethodData = (url, data, options) => {
    return this.request(this.endpoint + url, {...options, method: METHODS.DELETE, data}, options?.timeout);
  };

  private request<Response>(url: string | URL, options: Options, timeout = 5000): Promise<Response> {
    const {headers = {}, method, data} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }
      // console.log('request', data, data instanceof FormData);
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, url);

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
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
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
        if (!(data instanceof FormData)) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send(data);
        }
      }
    });
  };
}
