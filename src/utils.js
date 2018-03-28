import fetchJsonp from 'fetch-jsonp';

export const noop = () => {};
const fetchTools = {
  params(params) {
    try {
      return Object.keys(params).map((key) => {
        let param = params[key];
        switch (typeof param) {
          case 'object':
            param = escape(JSON.stringify(param));
            break;
          case 'undefined':
            param = '';
            break;
          default:
            break;
        }
        return `${key}=${param}`;
      }).join('&');
    } catch (e) {
      // console.log('error in urlParams');
      return '';
    }
  },
  fetch(url, options) {
    return fetch(url, options).then(
      (response) => {
        if (response.ok) {
          return response.text().then((text) => {
            try {
              return JSON.parse(text);
            } catch (e) {
              return Promise.reject(new Error('接口返回数据无法解析'));
            }
          });
        }
        return Promise.reject(new Error('请求失败'));
      },
      (error) => {
        throw error;
      },
    );
  },
  options(method = 'get', options = {}) {
    return {
      method: method.toUpperCase(),
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      ...options,
    };
  },
};

export function post(url, oriParams = {}) {
  const {
    fetch,
    options,
  } = fetchTools;
  try {
    return fetch(
      url,
      options(
        'post',
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(oriParams),
        },
      ),
    );
  } catch (e) {
    return Promise.reject(e);
  }
}

export function get(url, oriParams = {}) {
  const {
    params,
    fetch,
    options,
  } = fetchTools;

  const data = params(oriParams);

  if (data) {
    return fetch(`${url}?${data}`, options());
  }
  return fetch(url, options());
}

export function fetchJ(url, oriParams = {}) {
  const {
    params,
    fetch,
    options,
  } = fetchTools;

  const data = params(oriParams);
  
  return fetchJsonp(`${url}?${data}`)
  .then((response)  =>{
    return response.json()
  }).then((json)=> {
    console.log('parsed json', json)
    return json
  }).catch((ex) =>{
    console.log('parsing failed', ex)
  })
}
