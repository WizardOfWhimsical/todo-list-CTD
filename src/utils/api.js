const baseUrl = import.meta.env.VITE_BASE_URL;
const DEFAULT_OPTIONS = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
};

export async function fetchErrorHandling(endPoint, options = DEFAULT_OPTIONS) {
  // i have to give credit to Ej for this
  const mergedOptions =
    options === DEFAULT_OPTIONS
      ? DEFAULT_OPTIONS
      : {
          ...DEFAULT_OPTIONS,
          ...options,
          headers: {
            ...DEFAULT_OPTIONS.headers,
            ...options.headers,
          },
        };
  try {
    const response = await fetch(`${baseUrl}/${endPoint}`, mergedOptions);

    if (!response.ok || response.status === 401) {
      const error = await response.json();
      error.status = response.status;
      throw error;
    }

    const contentType = response.headers.get('content-type');
    console.log('checking header\n', contentType);
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Fetch Error Handling:', error);
    throw error;
  }
}
export async function post(endPoint, options) {
  return await fetchErrorHandling(`${endPoint}`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(options.body),
  });
}

export async function patch(endPoint, options) {
  return await fetchErrorHandling(`${endPoint}`, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(options.body),
  });
}

export async function get(endPoint, options) {
  return await fetchErrorHandling(endPoint, options);
}

export async function logoff(endPoint, options = DEFAULT_OPTIONS) {
  const mergedOptions =
    options === DEFAULT_OPTIONS
      ? DEFAULT_OPTIONS
      : {
          ...DEFAULT_OPTIONS,
          ...options,
          headers: {
            ...DEFAULT_OPTIONS.headers,
            ...options.headers,
          },
        };
  try {
    const response = await fetch(`${baseUrl}/${endPoint}`, mergedOptions);

    if (!response.ok || response.status === 401) {
      const error = await response.json();
      error.status = response.status;
      throw error;
    }
    console.log(response);
    // const contentType = response.headers.get('content-type');
    // console.log('checking header\n', contentType);
    // const data =
    //   contentType && contentType.includes('application/json')
    //     ? await response.json()
    //     : await response.text();

    return;
  } catch (error) {
    console.log('Fetch Error Handling:', error);
    throw error;
  }
}

export async function addTodo(todo, token) {
  return await fetchErrorHandling('tasks', {
    method: 'POST',
    headers: { 'X-CSRF-TOKEN': token },
    body: JSON.stringify({ title: todo.title, isCompleted: todo.isCompleted }),
  });
}
