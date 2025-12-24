export const API = Symbol('API');

export default () => store => next => action => {
  if (action[API]) {
    const {
      url,
      path = '',
      method = 'GET',
      body,
      headers,
      transform,
    } = action[API];

    const requestUrl = url ? `${url}${path}` : path;

    const options = {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(headers || {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    fetch(requestUrl, options)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const newAction = {
          ...action,
          type: action.type + '_SUCCESS',
          data: typeof transform === 'function' ? transform(data) : data,
        };
        delete newAction[API];
        store.dispatch(newAction);
      })
      .catch((error) => {
        const newAction = {
          ...action,
          type: action.type + '_FAILURE',
          error: String(error?.message || error),
        };
        delete newAction[API];
        store.dispatch(newAction);
      });
  }
  next(action);
};