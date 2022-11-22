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

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

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
  get: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.GET}, options?.timeout);
  };
  put: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.PUT}, options?.timeout);
  };
  post: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.POST}, options?.timeout);
  };
  delete: HTTPMethod = (url, options) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options?.timeout);
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

      if (isGet || !data) {
        xhr.send();
      } else {
        // @ts-ignore
        xhr.send(data);
      }
    });
  };
}
